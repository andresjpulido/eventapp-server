"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventService_1 = __importDefault(require("../../services/eventService"));
const typedi_1 = require("typedi");
const auth = require("../middlewares/auth");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.get("/events", async (req, res, next) => {
        let queryObj = req.query;
        let list = [];
        console.log("query: " + JSON.stringify(queryObj));
        if (typeof queryObj !== "object")
            queryObj = {};
        const serviceInstance = typedi_1.Container.get(eventService_1.default);
        list = await serviceInstance.get(queryObj);
        if (list.length == 0)
            return res.status(404).end();
        //await new Promise(r => setTimeout(r, 3000));
        return res.json(list);
    });
    app.get("/events/:id", async (req, res, next) => {
        //Validate params
        const id = req.params.id;
        let queryObj = { _id: id };
        let list = [];
        const serviceInstance = typedi_1.Container.get(eventService_1.default);
        list = await serviceInstance.get(queryObj);
        if (list.length == 0)
            return res.status(404).end();
        return res.json(list[0]);
    });
    app.put("/events/:id", async (req, res, next) => {
        //Validate params
        const id = req.params.id;
        let list = [];
        const serviceInstance = typedi_1.Container.get(eventService_1.default);
        console.log(req.body);
        list = await serviceInstance.update(id, req.body);
        return res.json(list);
    });
    app.post("/events", async (req, res, next) => {
        //Validate params
        let activity = req.body;
        console.log(activity);
        if (activity.title === undefined)
            return res.status(400).end();
        const serviceInstance = typedi_1.Container.get(eventService_1.default);
        let list = [];
        list = await serviceInstance.create(activity);
        return res.json(list);
    });
    app.delete("/events/:id", async (req, res, next) => {
        //Validate params
        const id = req.params.id;
        const serviceInstance = typedi_1.Container.get(eventService_1.default);
        let obj = await serviceInstance.delete(id);
        if (!obj)
            return res.status(404).end();
        return res.json(id);
    });
};
//# sourceMappingURL=event.js.map