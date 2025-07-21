import AppError from '../../error/AppError';
import { events } from './event.constant';
import { IEvent } from './event.interface';
import { v4 as uuidv4 } from 'uuid';

function categorizeEvent(
  title: string,
  notes?: string,
): 'Work' | 'Personal' | 'Other' {
  const workKeywords = ['meeting', 'project', 'client', 'deadline', 'report'];
  const personalKeywords = [
    'birthday',
    'family',
    'party',
    'friend',
    'vacation',
  ];

  const text = (title + ' ' + (notes || '')).toLowerCase();

  if (workKeywords.some((keyword) => text.includes(keyword))) return 'Work';
  if (personalKeywords.some((keyword) => text.includes(keyword)))
    return 'Personal';
  return 'Other';
}

const createEvent = async (event: IEvent) => {
  const result = events.push({
    ...event,
    id: uuidv4(),
    category: categorizeEvent(event.title, event.notes),
    archived: false,
  });
  return events[result - 1];
};

const getAllEvents = async (query: Record<string, unknown>) => {
  const { type } = query as { type: string };

  console.log({ type });
  const result = events.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
  console.log(typeof type);
  if (typeof type === 'string' && type !== '') {
    return result.filter((event) => event.category === type.toString());
  }
  return result;
};

const updateEvent = async (id: string, updatedEvent: Partial<IEvent>) => {
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) {
    throw new AppError(404, 'Event not found');
  }
  const updated = { ...events[index], ...updatedEvent };
  events[index] = updated;
  return updated;
};

const deleteEvent = async (id: string) => {
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) {
    throw new AppError(404, 'Event not found');
  }
  const deletedEvent = events.splice(index, 1);
  return deletedEvent[0];
};

export const EventServices = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
