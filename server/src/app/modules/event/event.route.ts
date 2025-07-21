import { Router } from 'express';
import { EventControllers } from './event.controller';
import validateRequest from '../../utils/validateRequest';
import { EventSchema } from './event.sechma';

const route = Router();

route.get('/', EventControllers.getAllEvents);
route.post(
  '/',
  validateRequest(EventSchema.createEventSchema),
  EventControllers.createEvent,
);

route.put(
  '/:id',
  validateRequest(EventSchema.updateEventSchema),
  EventControllers.updateEvent,
);
route.delete('/:id', EventControllers.deleteEvent);

export const EventRoute = route;
