import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EventServices } from './event.service';

const createEvent = catchAsync(async (req, res) => {
  const event = req.body;
  const result = await EventServices.createEvent(event);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await EventServices.getAllEvents(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Events retrieved successfully',
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;
  const result = await EventServices.updateEvent(id, updatedEvent);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event updated successfully',
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EventServices.deleteEvent(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Event deleted successfully',
    data: result,
  });
});

export const EventControllers = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
