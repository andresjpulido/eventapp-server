"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../../services/userService"));
const typedi_1 = require("typedi");
//const auth = require("../middlewares/auth");
exports.default = (app) => {
    app.get("/users2", async (req, res, next) => {
        let list = [];
        try {
            const queryObj = req.query;
            const serviceInstance = typedi_1.Container.get(userService_1.default);
            list = await serviceInstance.get(queryObj);
        }
        catch (e) {
            console.log(e);
        }
        return res.json(list);
    });
};
//# sourceMappingURL=auth.js.map