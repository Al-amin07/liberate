"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_route_1 = require("../modules/event/event.route");
const route = (0, express_1.Router)();
const modules = [
    {
        path: '/events',
        route: event_route_1.EventRoute,
    },
];
modules.forEach((el) => route.use(el.path, el.route));
exports.default = route;
