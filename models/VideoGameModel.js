import mongoose from 'mongoose';

const videoGameSchema = new mongoose.Schema(
  {
    productType: { type: String, default: 'video-games' },
    name: { type: String, required: true, minLength: 1, maxLength: 100 },
    console: { type: String, required: true, minLength: 1, maxLength: 50 },
    genre: { type: String, required: true, minLength: 1, maxLength: 50 },
    description: {
      type: String,
      required: true,
      minLength: 15,
      maxLength: 1000,
    },
    imgSrc: { type: String, minLength: 1, maxLength: 500, default: 'game.jpg' },
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
    price: { type: Number, required: true, min: 1 },
    discountPercentage: {
      type: Number,
      minLength: 1,
      maxLength: 20,
      default: 10,
    },
  },
  { timestamps: true }
);

export const VideoGameModel = mongoose.model('video-games', videoGameSchema);
