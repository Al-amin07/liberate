/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import AppError from '../error/AppError';

const globalErrorHander = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  let statusCode = 500;
  let message = 'Something went wrong';
  if (err instanceof ZodError) {
    message = err.issues[0].message;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err?.message || 'Something went wrong';
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: process.env.Node_ENV === 'development' && err?.stack,
  });
};

export default globalErrorHander;
