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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const models_1 = require("../db/models");
let userService = class userService {
    constructor() { }
    async get(queryObj) {
        return await models_1.userModel.find(queryObj).populate("city");
    }
    async delete(progressionId) {
        await models_1.userModel.findByIdAndDelete(progressionId);
    }
    async update(id, progression) {
        await models_1.userModel.findByIdAndUpdate(id, progression);
        return await models_1.userModel.find();
    }
    async create(user) {
        let newUser = new models_1.userModel(user);
        newUser.city = {
            id: ""
        };
        return await newUser.save();
    }
};
userService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], userService);
exports.default = userService;
//# sourceMappingURL=userService.js.map