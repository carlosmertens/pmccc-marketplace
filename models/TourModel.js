import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    productType: {type: String, default: 'tours'},
    toursType: {
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
      minLength: 1,
      maxLength: 50,
      required: true,
    },
    price: {type: Number, min: 100, max: 9999, required: true},
    discountPercentage: {
      type: Number,
      minLength: 1,
      maxLength: 20,
      default: 10,
    },
    duration: {type: Number, required: true, min: 1},
    maxGroupSize: {type: Number, min: 2, max: 50, required: true},
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty is either: easy, medium or hard',
      },
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 1000,
      default: 'Contact us for more information!',
    },
    startDates: {type: [Date], select: false},
    imgSrc: {
      type: String,
      minLength: 1,
      maxLength: 500,
      default: 'tours.jpeg',
    },
  },
  {timestamps: true}
);

function validateTour(tour) {
  const schema = Joi.object({
    name: Joi.string().required().trim().min(1).max(50),
    price: Joi.number().required().min(100).max(9999),
    discountPercentage: Joi.number().min(1).max(20).default(10),
    duration: Joi.number().required().min(1),
    maxGroupSize: Joi.number().require().min(2).max(50),
    difficulty: Joi.string(),
    description: Joi.string().required().trim().min(15).max(1000),
    imgSrc: Joi.string().min(1).max(500).default('Sightseeing.jpeg'),
  });

  return schema.validate(tour);
}

const TourModel = mongoose.model('tours', tourSchema);

export {TourModel, validateTour};
