import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

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
      isAdmin: this.isAdmin,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '2 day' }
  );
};

export const User = mongoose.model('users', userSchema);
