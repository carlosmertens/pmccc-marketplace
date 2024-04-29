import mongoose from 'mongoose';

const pcPartSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      enum: {values: ['PC_PART'], message: 'Creating a PC_PART type!'},
      default: 'PC_PART',
    },
    name: {type: String, minLength: 1, maxLength: 100, required: true},
    brand: {type: String, minLength: 1, maxLength: 50, required: true},
    price: {type: Number, minLength: 1, required: true},
    discountPercentage: {
      type: Number,
      minLength: 1,
      maxLength: 20,
      default: 10,
    },
    category: {type: String, minLength: 1, maxLength: 50, required: true},
    description: {type: String, minLength: 15, maxLength: 1000, required: true},
    imgSrc: {type: String, minLength: 1, maxLength: 500, default: 'pcpart.jpg'},
  },
  {timestamps: true}
);

export const PcPartModel = mongoose.model('Pc_part', pcPartSchema);
