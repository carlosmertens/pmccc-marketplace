import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      enum: {
        values: ['HIKING', 'MUSEUM', 'SIGHTSEEING'],
        message: 'Creating a tours can only be HIKING, MUSEUM and SIGHTSEEING',
      },
      required: true,
    },
    name: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
      required: true,
    },
    price: {type: Number, min: 100, max: 9999, required: true},
    discountPercentage: {
      type: Number,
      minlength: 1,
      maxlength: 20,
      default: 10,
    },
    duration: {type: Number, required: true},
    maxGroupSize: {type: Number, min: 2, max: 50, required: true},
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty is either: easy, medium or hard',
      },
      required: true,
    },
    ratings: {
      average: {type: Number, min: 0, max: 10, default: 0},
      count: {type: Number, min: 0, max: 10, default: 0},
    },
    summary: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 250,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: 'Contact us for more information!',
    },
    startDates: {type: [Date], select: false},
    // startDates: [Date],
  },
  {timestamps: true}
);

export const TourModel = mongoose.model('tours', tourSchema);
