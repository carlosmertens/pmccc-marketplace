import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  detail: [
    { productId: String, productType: String, name: String, price: Number },
  ],
  TotalPrice: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'complete'],
      message: 'Options: pending | complete',
    },
    default: 'pending',
  },
});

const OrderModel = mongoose.model('Orders', OrderSchema);

// TODO: Joi validation function

export { OrderModel };
