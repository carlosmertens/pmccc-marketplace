import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    detail: [
      {
        productId: { type: String, required: true },
        productType: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: {
        values: ['pending', 'complete'],
        message: 'Options: pending | complete',
      },
      default: 'pending',
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('Orders', OrderSchema);

// TODO: Joi validation function

export { OrderModel };
