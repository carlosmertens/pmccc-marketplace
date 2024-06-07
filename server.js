import 'dotenv/config';
import express from 'express';
import { log } from './logs/index.js';
import { connectDB } from './startup/connectDB.js';
import { startMiddleware } from './startup/startMiddleware.js';
import { startRoutes } from './startup/startRoutes.js';

/** Handle Rejections and Exceptions */
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

/** Initialize app */
const app = express();
connectDB();
startMiddleware(app);
startRoutes(app);

/** Initialize server */
const PORT = process.env.PORT || 8001;
const server = app.listen(PORT, () => {
  log.server(`Server is running on port ${PORT}`);
});
