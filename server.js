import 'dotenv/config';
import express from 'express';
import {log} from './logs/index.js';
import {connectDB} from './startup/connectDB.js';
import {startMiddleware} from './startup/startMiddleware.js';
import {startRoutes} from './startup/startRoutes.js';

/**
 * Handle Rejections and Exceptions
 */
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION => ' + err);
  console.log('Server shutting down 💥');

  close(() => process.exit(1));
});

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION => ' + err.name);
  console.log('UNCAUGHT EXCEPTION => ' + err.message);
  console.log('Server shutting down 💥');

  close(() => process.exit(1));
});

const app = express();

/**
 * Start MongoDB database connection
 */
connectDB();

/**
 * Start middleware
 */
startMiddleware(app);

/**
 * Initialize routes
 */
startRoutes(app);

/**
 * Start the server
 */
const PORT = process.env.PORT || 8001;
const server = app.listen(PORT, () => {
  log.server(`Server is running on port ${PORT}`);
});
