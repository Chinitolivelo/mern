import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
const Schema = mongoose.Schema;

// Database Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'Please input your Email'],
      validate: [validator.isEmail, 'Please input a valid Email'],
    },
    name: {
      type: String,
      unique: true,
      required: [true, 'Please input your name'],
    },
    username: {
      type: String,
      unique: true,
      required: [true, 'Please input your username'],
    },
    password: {
      type: String,
      required: [true, 'Please input your password'],
      minLength: [8, 'Please input of at least 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      // required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords don't match!",
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ['client', 'admin', 'student', 'employee'],
      default: 'client',
    },
    photo: {
      type: String,
    },
  },
  { collection: 'users', timestamps: true }
);

// User Save Function

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
export default User;
