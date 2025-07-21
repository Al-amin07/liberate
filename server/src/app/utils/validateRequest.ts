/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodObject } from 'zod';
import catchAsync from './catchAsync';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: ZodObject<any>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default validateRequest;
