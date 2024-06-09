import mongoose from 'mongoose';

const pcPartSchema = new mongoose.Schema(
  {
    productType: { type: String, default: 'pc-parts' },
    name: { type: String, minLength: 1, maxLength: 100, required: true },
    brand: { type: String, minLength: 1, maxLength: 50, required: true },
    category: { type: String, minLength: 1, maxLength: 50, required: true },
    description: {
      type: String,
      minLength: 15,
      maxLength: 1000,
      required: true,
    },
    imgSrc: {
      type: String,
      minLength: 1,
      maxLength: 500,
      default: 'pcpart.jpg',
    },
    reviews: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
          },
          rating: { type: Number, required: true, minLength: 1, maxLength: 5 },
          name: {
            type: String,
            minLength: 1,
            maxLength: 30,
            default: 'Anonymous',
          },
          comment: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 500,
          },
        },
      ],
      default: [],
    },
    ratingAvg: {
      type: Number,
      default: 0,
    },
    price: { type: Number, minLength: 1, required: true },
    discountPercentage: {
      type: Number,
      minLength: 1,
      maxLength: 20,
      default: 10,
    },
  },
  { timestamps: true }
);

export const PcPartModel = mongoose.model('pc-part', pcPartSchema);
