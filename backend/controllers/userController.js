import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/apperror.js';
import generateToken from '../utils/generateToken.js';
import ApiFeatures from '../utils/apifeatures.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username && !password) {
    return next(new AppError('Please provide a username and password', 400));
  }

  if (!username) {
    return next(new AppError('Please provide a username', 400));
  }

  if (!password) {
    return next(new AppError('Please provide a password', 400));
  }

  const user = await User.findOne({ username }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid username or password', 401));
  } else {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  }
});

// @desc Register New User
// @route POST /api/users
// @access Private

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, name, username, password, role } = req.body;

  const userExist = await User.findOne({ username });
  if (userExist) {
    res.status(400);
    throw new Error('User Already Exist');
  }

  const user = await User.create({
    email,
    name,
    username,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// @desc Auth user & get profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new AppError('User not found', 404);
  }
});

// @desc Auth user & get profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      username: updateUser.username,
      role: updateUser.role,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new AppError('User not found', 404);
  }
});

// @desc Auth user & get profile
// @route GET /api/users/profile
// @access Private

const getUsers = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;
  if (!users) {
    return next(new AppError('User Does Not Exist', 404));
  }
  return res.status(200).json(users);
});

// @desc Delete User
// @route DELETE /api/users/:id
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User Removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Update User
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();

    res.json({
      message_id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      username: updatedUser.username,
      role: updatedUser.role,
    });
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
