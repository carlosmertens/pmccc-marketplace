import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {type: String, minLenght: 2, maxLenght: 30, required: true},
  lastName: {type: String, minLenght: 2, maxLenght: 30, required: true},
  isAdmin: {type: Boolean, default: false},
  age: {type: Number, min: [18, 'You have to be least 18'], required: true},
  date: {type: Date, default: Date.now},
  email: {type: String, required: true},

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
    minLenght: [5, 'Password must be minimum 5 characters'],
    required: true,
  },
});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
