import mongoose from 'mongoose';

const videoGameSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      enum: {values: ['VIDEO_GAME'], message: 'Creating a VIDEO_GAME type!'},
      default: 'VIDEO_GAME',
    },
    name: {
      type: String,
      minLength: 1,
      maxLength: 50,
      required: true,
      unique: true,
    },
    console: {type: String, minLength: 1, maxLength: 50, required: true},
    genre: {type: String, minLength: 1, maxLength: 50, required: true},
    price: {type: Number, min: 1, required: true},
    discountPercentage: {
      type: Number,
      minLength: 1,
      maxLength: 20,
      default: 10,
    },
    description: {type: String, minLength: 15, maxLength: 1000, required: true},
    imgSrc: {type: String, minLength: 1, maxLength: 500, default: 'game.jpg'},
  },
  {timestamps: true}
);

export const VideoGameModel = mongoose.model('Video_games', videoGameSchema);
