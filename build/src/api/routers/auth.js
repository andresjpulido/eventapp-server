"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../../services/authService"));
const typedi_1 = require("typedi");
exports.default = (app) => {
    app.post("/signup", async (req, res, next) => {
        const { password, passwordConfirmation, email, name } = req.body;
        const serviceInstance = typedi_1.Container.get(authService_1.default);
        //validate input
        let user = {
            name: name,
            password: password,
            email: email,
        };
        let userBD = await serviceInstance.signup(user);
        return res.json(userBD);
    });
    app.post("/signin", async (req, res, next) => {
        let user = {};
        console.log(req.query, req.body);
        try {
            const queryObj = req.body;
            const serviceInstance = typedi_1.Container.get(authService_1.default);
            user = await serviceInstance.signin(queryObj);
        }
        catch (e) {
            console.log(e);
        }
        console.log("user", user);
        if (!user)
            return res.status(404).send({ code: "", message: "" });
        return res.status(200).send(user);
    });
    app.post("/signout", async (req, res, next) => {
        try {
            //TODO implement tokens blacklist
        }
        catch (e) {
            console.log(e);
        }
        return res.json(true);
    });
    app.post("/whoami", async (req, res, next) => {
        let token = req.body.token;
        const serviceInstance = typedi_1.Container.get(authService_1.default);
        let userBD = await serviceInstance.whoami(token);
        if (userBD !== null)
            return res.json(userBD[0]);
        else
            return res.json({});
    });
};
//# sourceMappingURL=auth.js.map