"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventServices = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const event_constant_1 = require("./event.constant");
const uuid_1 = require("uuid");
function categorizeEvent(title, notes) {
    const workKeywords = ['meeting', 'project', 'client', 'deadline', 'report'];
    const personalKeywords = [
        'birthday',
        'family',
        'party',
        'friend',
        'vacation',
    ];
    const text = (title + ' ' + (notes || '')).toLowerCase();
    if (workKeywords.some((keyword) => text.includes(keyword)))
        return 'Work';
    if (personalKeywords.some((keyword) => text.includes(keyword)))
        return 'Personal';
    return 'Other';
}
const createEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const result = event_constant_1.events.push(Object.assign(Object.assign({}, event), { id: (0, uuid_1.v4)(), category: categorizeEvent(event.title, event.notes), archived: false }));
    return event_constant_1.events[result - 1];
});
const getAllEvents = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = query;
    console.log({ type });
    const result = event_constant_1.events.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
    });
    console.log(typeof type);
    if (typeof type === 'string' && type !== '') {
        return result.filter((event) => event.category === type.toString());
    }
    return result;
});
const updateEvent = (id, updatedEvent) => __awaiter(void 0, void 0, void 0, function* () {
    const index = event_constant_1.events.findIndex((event) => event.id === id);
    if (index === -1) {
        throw new AppError_1.default(404, 'Event not found');
    }
    const updated = Object.assign(Object.assign({}, event_constant_1.events[index]), updatedEvent);
    event_constant_1.events[index] = updated;
    return updated;
});
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const index = event_constant_1.events.findIndex((event) => event.id === id);
    if (index === -1) {
        throw new AppError_1.default(404, 'Event not found');
    }
    const deletedEvent = event_constant_1.events.splice(index, 1);
    return deletedEvent[0];
});
exports.EventServices = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
};
