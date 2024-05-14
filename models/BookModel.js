import mongoose from 'mongoose';
import Joi from 'joi';

const BookSchema = new mongoose.Schema(
  {
    productType: {type: String, default: 'books'},
    name: {type: String, minLength: 1, maxLength: 50, required: true},
    author: {type: String, minLength: 1, maxLength: 50, required: true},
    genre: {type: String, minLength: 1, maxLength: 50, required: true},
    pages: {type: Number, required: true},
    description: {type: String, minLength: 15, maxLength: 1000, required: true},
    imgSrc: {type: String, minLength: 1, maxLength: 500, default: 'book.jpg'},
    reviews: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
          },
          rating: {type: Number, required: true, minLength: 1, maxLength: 5},
          name: {
            type: String,
            minLength: 1,
            maxLength: 30,
            default: 'Anonymous',
          },
          comment: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 500,
          },
        },
      ],
      default: [],
    },
    //TODO: Create a getter to calculate the reviews
    ratings: {type: Number, minLength: 1, maxLength: 5},
    price: {type: Number, minLength: 1, required: true},
    discountPercentage: {
      type: Number,
      minLength: 1,
      maxLength: 20,
      default: 10,
    },
  },
  {timestamps: true}
);

const BookModel = mongoose.model('Book', BookSchema);

function validateBook(book) {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(50),
    author: Joi.string().required().min(1).max(50),
    genre: Joi.string().required().min(1).max(50),
    pages: Joi.number().required().min(1),
    description: Joi.string().required().min(15).max(1000),
    imgSrc: Joi.string().min(1).max(500).default('book.jpg'),
    price: Joi.number().required().min(1),
    discountPercentage: Joi.number().min(1).max(20).default(10),
  });

  return schema.validate(book);
}

export {BookModel, validateBook};
