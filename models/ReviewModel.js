import mongoose from 'mongoose';
import Joi from 'joi';

const ReviewSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', require: true},
  rating: {type: Number, required: true, minLength: 1, maxLength: 5},
  name: {type: String, minLength: 1, maxLength: 30, default: 'Anonymous'},
  comment: {type: String, required: true, minLength: 10, maxLength: 500},
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

function validateReview(review) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
    name: Joi.string().min(1).max(30).default('Anonymous'),
    comment: Joi.string().required().min(10).max(500),
  });

  return schema.validate(review);
}

export {ReviewModel, validateReview};
