import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

/** Defines the user schema for storing user data in MongoDB */
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
    age: { type: Number, required: true, min: 18, max: 120 },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other', 'unknown'],
        message: 'Please select male, female or other',
      },
      default: 'unknown',
    },
    homeAddress: {
      street: { type: String, default: '', lowercase: true },
      city: { type: String, default: '', lowercase: true },
      country: { type: String, default: '', lowercase: true },
    },
    shippingAddress: {
      street: { type: String, default: '', lowercase: true },
      city: { type: String, default: '', lowercase: true },
      country: { type: String, default: '', lowercase: true },
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }],
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
    newsletter: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/** Method that generates a JWT token containing user information */
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
    { expiresIn: '2 day' }
  );
};

/** Mongoose model representing the User collection in MongoDB. */
const User = mongoose.model('users', userSchema);

/** Validates user data for signup using Joi schema */
function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(2).max(50).trim(),
    lastName: Joi.string().required().min(2).max(50).trim(),
    age: Joi.number().required().min(18).max(120),
    gender: Joi.string(),
    // homeAddress: Joi.object({
    //   street: Joi.string().required().min(0),
    //   city: Joi.string().required().min(0),
    //   country: Joi.string().required().min(0),
    // }),
    // shippingAddress: Joi.object({
    //   street: Joi.string().required().min(0),
    //   city: Joi.string().required().min(0),
    //   country: Joi.string().required().min(0),
    // }),
    email: Joi.string().required().email().min(5).max(255).trim(),
    password: Joi.string().required().min(5).max(32).trim(),
  });

  return schema.validate(user);
}

/** Validates user data for patching operation using Joi schema */
function validatePatch(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).trim(),
    lastName: Joi.string().min(2).max(50).trim(),
    age: Joi.number().min(18).max(120),
    homeAddress: Joi.object({
      street: Joi.string().required().min(0),
      city: Joi.string().required().min(0),
      country: Joi.string().required().min(0),
    }),
    shippingAddress: Joi.object({
      street: Joi.string().required().min(0),
      city: Joi.string().required().min(0),
      country: Joi.string().required().min(0),
    }),
    gender: Joi.string(),
    email: Joi.string().email().min(5).max(255).trim(),
    password: Joi.string().min(5).max(32).trim(),
    newsletter: Joi.boolean(),
  });

  return schema.validate(user);
}

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().required().email().trim().min(5).max(255),
    password: Joi.string().required().trim().min(5).max(32),
  });

  return schema.validate(req);
}

const joi = { validateUser, validatePatch, validateLogin };

export { User, joi };
