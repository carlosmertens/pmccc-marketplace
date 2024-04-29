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
      minlength: 1,
      maxlength: 50,
      required: true,
      unique: true,
    },
    console: {type: String, minlength: 1, maxlength: 50, required: true},
    genre: {type: String, minlength: 1, maxlength: 50, required: true},
    price: {type: Number, min: 1, required: true},
    discountPercentage: {
      type: Number,
      minlength: 1,
      maxlength: 20,
      default: 10,
    },
    description: {type: String, minlength: 15, maxlength: 1000, required: true},
    imgSrc: {type: String, minlength: 1, maxlength: 500, default: 'game.jpg'},
  },
  {timestamps: true}
);

export const VideoGameModel = mongoose.model('Video_games', videoGameSchema);
