import { Router } from 'express';

import { EventRoute } from '../modules/event/event.route';

const route = Router();
const modules = [
  {
    path: '/events',
    route: EventRoute,
  },
];
modules.forEach((el) => route.use(el.path, el.route));

export default route;
