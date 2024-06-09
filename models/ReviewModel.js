import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', require: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  name: { type: String, minLength: 1, maxLength: 30, default: 'Anonymous' },
  comment: { type: String, required: true, minLength: 10, maxLength: 500 },
});

export const ReviewModel = mongoose.model('Review', reviewSchema);
