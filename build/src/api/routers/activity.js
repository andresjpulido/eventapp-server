"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activitiesService_1 = __importDefault(require("../../services/activitiesService"));
const typedi_1 = require("typedi");
const auth = require("../middlewares/auth");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.get("/activities", async (req, res, next) => {
        let queryObj = req.query;
        let list = [];
        console.log("query: " + JSON.stringify(queryObj));
        if (typeof queryObj !== "object")
            queryObj = {};
        const serviceInstance = typedi_1.Container.get(activitiesService_1.default);
        list = await serviceInstance.get(queryObj);
        if (list.length == 0)
            return res.status(404).end();
        //await new Promise(r => setTimeout(r, 3000));
        return res.json(list);
    });
    app.get("/activities/:id", async (req, res, next) => {
        //Validate params
        const id = req.params.id;
        let queryObj = { _id: id };
        let list = [];
        const serviceInstance = typedi_1.Container.get(activitiesService_1.default);
        list = await serviceInstance.get(queryObj);
        if (list.length == 0)
            return res.status(404).end();
        return res.json(list[0]);
    });
    app.put("/activities/:id", async (req, res, next) => {
        //Validate params
        const id = req.params.id;
        let list = [];
        const serviceInstance = typedi_1.Container.get(activitiesService_1.default);
        console.log(req.body);
        list = await serviceInstance.update(id, req.body);
        return res.json(list);
    });
    app.post("/activities", async (req, res, next) => {
        //Validate params
        let activity = req.body;
        if (activity.title === undefined ||
            activity.latitude === undefined ||
            activity.longitude === undefined ||
            activity.url === undefined ||
            activity.description === undefined)
            return res.status(400).end();
        const serviceInstance = typedi_1.Container.get(activitiesService_1.default);
        let list = [];
        list = await serviceInstance.create(activity);
        return res.json(list);
    });
    app.delete("/activities/:id", async (req, res, next) => {
        //Validate params
        const id = req.params.id;
        const serviceInstance = typedi_1.Container.get(activitiesService_1.default);
        let obj = await serviceInstance.delete(id);
        if (!obj)
            return res.status(404).end();
        return res.json(id);
    });
};
//# sourceMappingURL=activity.js.map