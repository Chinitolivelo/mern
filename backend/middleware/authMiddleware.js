import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/apperror.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new AppError('Not Authorized, Token Failed ', 401);
    }
  }
  if (!token) {
    res.status(401);
    throw new AppError('Not Authorized');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Insufficient privileges to access this page');
  }
};

const client = (req, res, next) => {
  if (req.user && req.user.role === 'client') {
    next();
  } else {
    res.status(401);
    throw new Error('Insufficient privileges to access this page');
  }
};

export { protect, admin, client };
