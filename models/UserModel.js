import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

/**
 * Defines the user schema for storing user data in MongoDB.
 * @typedef {Object} User - User schema definition.
 * @method User.generateJWT() - Generates a JWT token for the user.
 */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 120,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: 'Please select male, female or other',
      },
    },
    email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 1024,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

/**
 * Method that generates a JWT token containing user information.
 */
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn: '2 day'}
  );
};

/** Mongoose model representing the User collection in MongoDB. */
const User = mongoose.model('users', userSchema);

/**
 * Validates user data for signup using Joi schema.
 * @param {Object} user - User data to be validated.
 * @returns {Promise<any>} - Promise resolving to the validation result or rejection with an error.
 */
function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(2).max(50).trim(),
    lastName: Joi.string().required().min(2).max(50).trim(),
    age: Joi.number().required().min(18).max(120),
    gender: Joi.string(),
    email: Joi.string().required().email().min(5).max(255).trim(),
    password: Joi.string().required().min(5).max(32).trim(),
    isAdmin: Joi.boolean().default(false),
  });

  return schema.validate(user);
}

/**
 * Validates user data for login using Joi schema.
 * @param {Object} user - User data to be validated.
 * @returns {Promise<any>} - Promise resolving to the validation result or rejection with an error.
 */
function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(5).max(255).trim(),
    password: Joi.string().required().min(5).max(32).trim(),
  });

  return schema.validate(user);
}

/**
 * Validates user data for patching operation using Joi schema.
 * @param {Object} user - User data to be validated.
 * @returns {Promise<any>} - Promise resolving to the validation result or rejection with an error.
 */
function validatePatch(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).trim(),
    lastName: Joi.string().min(2).max(50).trim(),
    age: Joi.number().min(18).max(120),
    gender: Joi.string(),
    email: Joi.string().email().min(5).max(255).trim(),
    password: Joi.string().min(5).max(32).trim(),
    isAdmin: Joi.boolean().default(false),
  });

  return schema.validate(user);
}

const joi = {validateUser, validateLogin, validatePatch};

export {User, joi};
