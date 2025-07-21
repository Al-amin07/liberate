"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const AppError_1 = __importDefault(require("../error/AppError"));
const globalErrorHander = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    if (err instanceof zod_1.ZodError) {
        message = err.issues[0].message;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = (err === null || err === void 0 ? void 0 : err.message) || 'Something went wrong';
    }
    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: process.env.Node_ENV === 'development' && (err === null || err === void 0 ? void 0 : err.stack),
    });
};
exports.default = globalErrorHander;
