/**
 * Imports necessary libraries for user schema, validation, and JWT generation.
 *
 * @typedef {import('mongoose').Schema} Schema - Mongoose schema type definition.
 * @typedef {import('joi').ObjectSchema} ObjectSchema - Joi object schema type definition.
 */
import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

/**
 * Defines the user schema for storing user data in MongoDB.
 *
 * @typedef {Object} User - User schema definition.
 * @property {string} firstName - User's first name. (required, min length 2, max length 30)
 * @property {string} lastName - User's last name. (required, min length 2, max length 30)
 * @property {number} age - User's age. (required, minimum 18, maximum 120)
 * @property {string} gender - User's gender. (optional, enum: male, female, other)
 * @property {string} email - User's email address. (required, unique, trimmed, lowercase)
 * @property {string} password - User's password. (required, minimum length 5, maximum length 32)
 * @property {boolean} isAdmin - Indicates if the user is an admin. (default: false)
 * @property {Date} createdAt - Date and time of user creation. (automatically generated)
 * @property {Date} updatedAt - Date and time of user data update. (automatically updated)
 *
 * @method User.generateJWT() - Generates a JWT token for the user.
 */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
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
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 64,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

/**
 * Generates a JWT token containing user information.
 *
 * @this {mongoose.Model} - User model instance
 * @returns {string} - The generated JWT token.
 */
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      isAdmin: this.admin,
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn: '2 day'}
  );
};

/** Mongoose model representing the User collection in MongoDB. */
const User = mongoose.model('users', userSchema);

/**
 * Validates user data for signup using Joi schema.
 *
 * @param {Object} user - User data to be validated.
 * @returns {Promise<any>} - Promise resolving to the validation result or rejection with an error.
 */
function validateSignUp(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required().trim(),
    lastName: Joi.string().min(2).max(30).required().trim(),
    age: Joi.number().min(18).max(120).required(),
    gender: Joi.string(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(5).max(32).required().trim(),
    isAdmin: Joi.boolean().default(false),
  });

  return schema.validate(user);
}

/**
 * Validates user data for login using Joi schema.
 *
 * @param {Object} user - User data to be validated.
 * @returns {Promise<any>} - Promise resolving to the validation result or rejection with an error.
 */
function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(5).max(32).required().trim(),
  });

  return schema.validate(user);
}

export {User, validateSignUp, validateLogin};
