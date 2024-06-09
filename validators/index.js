import Joi from 'joi';

function createBook(book) {
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

function patchBook(book) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50),
    author: Joi.string().min(1).max(50),
    genre: Joi.string().min(1).max(50),
    pages: Joi.number().min(1),
    description: Joi.string().min(15).max(1000),
    imgSrc: Joi.string().min(1).max(500).default('book.jpg'),
    price: Joi.number().min(1),
    discountPercentage: Joi.number().min(1).max(20).default(10),
  });

  return schema.validate(book);
}

function createVideoGame(game) {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(100),
    console: Joi.string().required().min(1).max(50),
    genre: Joi.string().required().min(1).max(50),
    description: Joi.string().required().min(15).max(1000),
    imgSrc: Joi.string().min(1).max(500).default('pcpart.jpg'),
    price: Joi.number().required().min(1),
    discountPercentage: Joi.number().min(1).max(20).default(10),
    category: Joi.string().required().min(1).max(50),
  });

  return schema.validate(game);
}

function patchVideoGame(game) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100),
    console: Joi.string().min(1).max(50),
    genre: Joi.string().min(1).max(50),
    description: Joi.string().min(15).max(1000),
    imgSrc: Joi.string().min(1).max(500).default('pcpart.jpg'),
    price: Joi.number().min(1),
    discountPercentage: Joi.number().min(1).max(20).default(10),
    category: Joi.string().min(1).max(50),
  });

  return schema.validate(game);
}

function createPcPart(part) {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(100),
    brand: Joi.string().required().min(1).max(50),
    category: Joi.string().required().min(1).max(50),
    description: Joi.string().required().min(15).max(1000),
    imgSrc: Joi.string().min(1).max(500).default('pcpart.jpg'),
    price: Joi.number().required().min(1),
    discountPercentage: Joi.number().min(1).max(20).default(10),
  });

  return schema.validate(part);
}

function patchPcPart(part) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100),
    brand: Joi.string().min(1).max(50),
    category: Joi.string().min(1).max(50),
    description: Joi.string().min(15).max(1000),
    imgSrc: Joi.string().min(1).max(500).default('pcpart.jpg'),
    price: Joi.number().min(1),
    discountPercentage: Joi.number().min(1).max(20).default(10),
  });

  return schema.validate(part);
}

function createTour(tour) {
  const schema = Joi.object({
    toursType: Joi.string().required().valid('hiking', 'museum', 'sightseeing'),
    name: Joi.string().required().trim().min(1).max(50),
    duration: Joi.number().required().min(1),
    maxGroupSize: Joi.number().required().min(2).max(50),
    difficulty: Joi.string().required().valid('easy', 'medium', 'hard'),
    description: Joi.string().required().trim().min(10).max(1000),
    imgSrc: Joi.string().min(1).max(500).default('Sightseeing.jpeg'),
    price: Joi.number().required().min(100).max(9999),
    discountPercentage: Joi.number().min(1).max(20).default(10),
  });

  return schema.validate(tour);
}

function patchTour(tour) {
  const schema = Joi.object({
    toursType: Joi.string().valid('hiking', 'museum', 'sightseeing'),
    name: Joi.string().trim().min(1).max(50),
    duration: Joi.number().min(1),
    maxGroupSize: Joi.number().min(2).max(50),
    difficulty: Joi.string().valid('easy', 'medium', 'hard'),
    description: Joi.string().trim().min(10).max(1000),
    imgSrc: Joi.string().min(1).max(500).default('Sightseeing.jpeg'),
    price: Joi.number().min(100).max(9999),
    discountPercentage: Joi.number().min(1).max(20).default(10),
  });

  return schema.validate(tour);
}

function createReview(review) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
    name: Joi.string().min(1).max(30).default('Anonymous'),
    comment: Joi.string().required().min(10).max(500),
  });

  return schema.validate(review);
}

function patchReview(review) {
  const schema = Joi.object({
    userId: Joi.string(),
    rating: Joi.number().min(1).max(5),
    name: Joi.string().min(1).max(30).default('Anonymous'),
    comment: Joi.string().min(10).max(500),
  });

  return schema.validate(review);
}

/** Validates user data for signup using Joi schema */
function createUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(2).max(50).trim(),
    lastName: Joi.string().required().min(2).max(50).trim(),
    age: Joi.number().required().min(18).max(120),
    gender: Joi.string(),
    homeAddress: Joi.object({
      street: Joi.string().required().min(0),
      city: Joi.string().required().min(0),
      country: Joi.string().required().min(0),
    }),
    shippingAddress: Joi.object({
      street: Joi.string().required().min(0),
      city: Joi.string().required().min(0),
      country: Joi.string().required().min(0),
    }),
    email: Joi.string().required().email().min(5).max(255).trim(),
    password: Joi.string().required().min(5).max(32).trim(),
  });

  return schema.validate(user);
}

function patchUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).trim(),
    lastName: Joi.string().min(2).max(50).trim(),
    age: Joi.number().min(18).max(120),
    gender: Joi.string().valid('male', 'female', 'other', 'unknown'),
    homeAddress: Joi.object({
      street: Joi.string().required().min(0),
      city: Joi.string().required().min(0),
      country: Joi.string().required().min(0),
    }),
    shippingAddress: Joi.object({
      street: Joi.string().required().min(0),
      city: Joi.string().required().min(0),
      country: Joi.string().required().min(0),
    }),
    email: Joi.string().email().min(5).max(255).trim(),
    password: Joi.string().min(5).max(32).trim(),
    newsletter: Joi.boolean(),
  });

  return schema.validate(user);
}

function login(user) {
  const schema = Joi.object({
    email: Joi.string().required().email().trim().min(5).max(255),
    password: Joi.string().required().trim().min(5).max(32),
  });

  return schema.validate(user);
}

function createOrder(order) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    detail: Joi.array().required(),
    totalPrice: Joi.number().required().min(1),
    status: Joi.string().required().valid('pending', 'complete'),
  });

  return schema.validate(order);
}

function patchOrder(order) {
  const schema = Joi.object({
    totalPrice: Joi.number().min(1),
    status: Joi.string().valid('pending', 'complete'),
  });

  return schema.validate(order);
}

function patchOrderStatus(order) {
  const schema = Joi.object({
    status: Joi.string().required().valid('pending', 'complete'),
  });

  return schema.validate(order);
}

export const validate = {
  createBook,
  patchBook,
  createVideoGame,
  patchVideoGame,
  createPcPart,
  patchPcPart,
  createTour,
  patchTour,
  createReview,
  patchReview,
  createUser,
  login,
  patchUser,
  createOrder,
  patchOrder,
  patchOrderStatus,
};
