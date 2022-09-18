"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const userService_1 = __importDefault(require("./userService"));
const typedi_2 = require("typedi");
const jwt_1 = require("../services/jwt");
const models_1 = require("../db/models");
let authService = class authService {
    constructor() { }
    async signup(user) {
        const serviceInstance = typedi_2.Container.get(userService_1.default);
        try {
            //validate user doesnt exist
            let savedUser = await serviceInstance.create(user);
            let token = await (0, jwt_1.createToken)(user.email, savedUser.id, user.name);
            delete savedUser._doc.password;
            delete savedUser._doc.updatedAt;
            let result = { user: savedUser._doc, token: token };
            console.log("resulr ####", result);
            return result;
        }
        catch (e) {
            console.log(e);
        }
    }
    async signin(queryObj) {
        const serviceInstance = typedi_2.Container.get(userService_1.default);
        let token = "";
        try {
            //validate user doesnt exist
            console.log("User::", queryObj);
            let savedUser = await models_1.userModel.find({ email: queryObj.email });
            console.log("savedUser::", savedUser);
            if (savedUser.length === 1) {
                let user = savedUser[0];
                console.log("user found ", user);
                let exist = await user.matchPassword(queryObj.password);
                if (exist) {
                    token = (0, jwt_1.createToken)(user.email, user._id, user.username);
                    return { user, token: token };
                }
                else {
                    console.log("clave no valida");
                }
            }
            return null;
        }
        catch (e) {
            console.log(e);
        }
    }
    async whoami(token) {
        const serviceInstance = typedi_2.Container.get(userService_1.default);
        try {
            let id = (0, jwt_1.decodeToken)(token);
            let queryObj = {
                _id: id
            };
            let user = await serviceInstance.get(queryObj);
            return user;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
};
authService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], authService);
exports.default = authService;
//# sourceMappingURL=authService.js.map