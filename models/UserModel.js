import mongoose from 'mongoose';

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
    required: false,
  },

  password: {
    type: String,
    minLength: [5, 'Password must be minimum 5 characters'],
    required: true,
    select: false,
  },
});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
