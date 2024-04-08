import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  name: { type: String, minLenght: 1, maxLenght: 30, required: true },
  sex: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'Sex must be male, female, or other',
    },
    required: true,
  },
  age: {
    type: Number,
    min: [1, 'Must be older than 1 to be register'],
    max: [67, 'Can not be older than 67 to be register'],
    required: true,
  },
  member: { type: Boolean, default: false },
});

export const TestModel = mongoose.model('test', testSchema);
