"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoute = void 0;
const express_1 = require("express");
const event_controller_1 = require("./event.controller");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const event_sechma_1 = require("./event.sechma");
const route = (0, express_1.Router)();
route.get('/', event_controller_1.EventControllers.getAllEvents);
route.post('/', (0, validateRequest_1.default)(event_sechma_1.EventSchema.createEventSchema), event_controller_1.EventControllers.createEvent);
route.put('/:id', (0, validateRequest_1.default)(event_sechma_1.EventSchema.updateEventSchema), event_controller_1.EventControllers.updateEvent);
route.delete('/:id', event_controller_1.EventControllers.deleteEvent);
exports.EventRoute = route;
