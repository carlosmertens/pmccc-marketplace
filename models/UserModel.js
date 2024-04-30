import mongoose from 'mongoose';
import Joi from 'joi';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
    trim: true,
    lowercase: true,
  },
  // TODO: Admin should be read only
  isAdmin: {type: Boolean, default: false},
  age: {
    type: Number,
    min: [18, 'You have to be at least 18 to register'],
    required: true,
  },
  createdOn: {type: Date, default: Date.now},
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'Please select male, female or other',
    },
    // required: false,
  },

  password: {
    type: String,
    minLength: [5, 'Password must be minimum 5 characters'],
    required: true,
    select: false,
  },
});

const User = mongoose.model('users', userSchema);

function validate(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required().trim(),
    lastName: Joi.string().min(2).max(30).required().trim(),
    age: Joi.number().min(18).max(120).required(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(5).max(32).required().trim(),
  });

  return schema.validate(user);
}

export {User, validate};
