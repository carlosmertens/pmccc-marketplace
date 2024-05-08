import mongoose from 'mongoose';

// TODO:
// Review property (customer name, stars up to 5 and comment)
// Name default anonymus
// Add to all products and tours
const BookSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      enum: {values: ['BOOK'], message: 'Creating a BOOK type!'},
      default: 'BOOK',
    },
    name: {type: String, minLength: 1, maxLength: 50, required: true},
    author: {type: String, minLength: 1, maxLength: 50, required: true},
    genre: {type: String, minLength: 1, maxLength: 50, required: true},
    price: {type: Number, minLength: 1, required: true},
    discountPercentage: {
      type: Number,
      minLength: 1,
      maxLength: 20,
      default: 10,
    },
    pages: {type: Number, required: true},
    description: {type: String, minLength: 15, maxLength: 1000, required: true},
    imgSrc: {type: String, minLength: 1, maxLength: 500, default: 'book.jpg'},
  },
  {timestamps: true}
);

export const BookModel = mongoose.model('Book', BookSchema);
