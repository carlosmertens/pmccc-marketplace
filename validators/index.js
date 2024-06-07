import Joi from 'joi';

function book(book) {
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

export const validate = { book };
