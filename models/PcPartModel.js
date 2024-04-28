import mongoose from 'mongoose';

const pcPartSchema = new mongoose.Schema(
  {
    productType: {
      type: String,
      enum: {values: ['PC_PART'], message: 'Creating a PC_PART type!'},
      default: 'PC_PART',
    },
    name: {type: String, minlength: 1, maxlength: 100, required: true},
    brand: {type: String, minlength: 1, maxlength: 50, required: true},
    price: {type: Number, minlength: 1, required: true},
    discountPercentage: {
      type: Number,
      minlength: 1,
      maxlength: 20,
      default: 10,
    },
    category: {type: String, minlength: 1, maxlength: 50, required: true},
    description: {type: String, minlength: 15, maxlength: 1000, required: true},
    imgSrc: {type: String, minlength: 1, maxlength: 500, default: 'pcpart.jpg'},
  },
  {timestamps: true}
);

export const PcPartModel = mongoose.model('Pc_part', pcPartSchema);
