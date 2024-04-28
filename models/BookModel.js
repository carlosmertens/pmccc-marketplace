import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      enum: {values: ['BOOK'], message: 'Creating a BOOK type!'},
      default: 'BOOK',
    },
    name: {type: String, minlength: 1, maxlength: 50, required: true},
    author: {type: String, minlength: 1, maxlength: 50, required: true},
    genre: {type: String, minlength: 1, maxlength: 50, required: true},
    price: {type: Number, minlength: 1, required: true},
    discountPercentage: {
      type: Number,
      minlength: 1,
      maxlength: 20,
      default: 10,
    },
    pages: {type: Number, required: true},
    description: {type: String, minlength: 15, maxlength: 1000, required: true},
    imgSrc: {type: String, minlength: 1, maxlength: 500, default: 'book.jpg'},
  },
  {timestamps: true}
);

export const BookModel = mongoose.model('Book', BookSchema);
