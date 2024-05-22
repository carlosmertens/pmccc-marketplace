import mongoose from 'mongoose';

//TODO: Create a getter to calculate reviews in ratings property

const tourSchema = new mongoose.Schema(
  {
    productType: {type: String, default: 'tours'},
    toursType: {
      type: String,
      enum: {
        values: ['hiking', 'museum', 'sightseeing'],
        message: 'Creating a tours can only be hiking, museum or sightseeing',
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
    price: {type: Number, min: 100, max: 9999, required: true},
    discountPercentage: {
      type: Number,
      minLength: 1,
      maxLength: 20,
      default: 10,
    },
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
    ratings: {type: Number, minLength: 1, maxLength: 5},
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
