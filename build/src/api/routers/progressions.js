"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const progressionsService_1 = __importDefault(require("../../services/progressionsService"));
const typedi_1 = require("typedi");
const auth = require("../middlewares/auth");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.get("/progressions", async (req, res, next) => {
        const queryObj = req.query;
        const serviceInstance = typedi_1.Container.get(progressionsService_1.default);
        let list = [];
        list = await serviceInstance.get(queryObj);
        return res.json(list);
    });
    app.get("/progressions/:id", async (req, res, next) => {
        const serviceInstance = typedi_1.Container.get(progressionsService_1.default);
        const id = req.params.id;
        const list = await serviceInstance.get(id);
        return res.json(list);
    });
    app.put("/progressions/:id", async (req, res, next) => {
        const id = req.params.id;
        const serviceInstance = typedi_1.Container.get(progressionsService_1.default);
        const list = await serviceInstance.update(id, req.body);
        return res.json(list);
    });
    app.post("/progressions", async (req, res, next) => {
        const serviceInstance = typedi_1.Container.get(progressionsService_1.default);
        const list = await serviceInstance.create(req.body);
        return res.json(list);
    });
    app.delete("/progressions/:id", async (req, res, next) => {
        const serviceInstance = typedi_1.Container.get(progressionsService_1.default);
        const id = req.params.id;
        const list = await serviceInstance.delete(id);
        return res.json(list);
    });
};
//# sourceMappingURL=progressions.js.map