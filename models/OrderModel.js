import mongoose from 'mongoose';
import Joi from 'joi';

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

function validateOrder(book) {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(50),
    author: Joi.string().required().min(1).max(50),
    genre: Joi.string().required().min(1).max(50),
    pages: Joi.number().required().min(1),
    description: Joi.string().required().min(15).max(1000),
    imgSrc: Joi.string().min(1).max(500).default('book.jpg'),
    price: Joi.number().required().min(1),
    discountPercentage: Joi.number().min(1).max(20).default(10),
  });

  return schema.validate(book);
}

export { OrderModel, validateOrder };
