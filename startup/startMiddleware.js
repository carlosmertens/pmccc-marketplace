import express from 'express';
import cors from 'cors';
import { logger } from '../middleware/logger.js';

export function startMiddleware(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Credentials',
        'x-auth-token',
      ],
      exposedHeaders: ['x-auth-token'],
    })
  );
  // app.use(express.static('public'));
  app.use(logger);
}
