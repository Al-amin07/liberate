"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const createEventSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({ error: 'Title is required' }).min(1, 'Title is required'),
        date: zod_1.default.string({ error: 'Date is required' }).regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: 'Date must be in YYYY-MM-DD format',
        }),
        time: zod_1.default
            .string({ error: 'Time is required' })
            .regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
        notes: zod_1.default.string().optional(),
        category: zod_1.default.enum(['Work', 'Personal', 'Other']).optional(),
        archived: zod_1.default.boolean().default(false),
    }),
});
const updateEventSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().min(1, 'Title is required').optional(),
        date: zod_1.default
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
            .optional(),
        time: zod_1.default
            .string()
            .regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')
            .optional(),
        notes: zod_1.default.string().optional(),
        //   category: z.enum(['Work', 'Personal', 'Other']).optional(),
        archived: zod_1.default.boolean().optional(),
    }),
});
exports.EventSchema = {
    createEventSchema,
    updateEventSchema,
};
