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
const mongoose = require("mongoose");
let InterestService = class InterestService {
    constructor() { }
    async get(queryObj) {
        if (queryObj._id)
            if (!mongoose.Types.ObjectId.isValid(queryObj._id))
                queryObj._id = null;
        return await models_1.interestModel.find(queryObj);
    }
    async delete(activityId) {
        if (activityId)
            if (!mongoose.Types.ObjectId.isValid(activityId))
                return null;
        if (!activityId)
            return null;
        return await models_1.interestModel.findByIdAndDelete(activityId);
    }
    async update(id, activity) {
        if (id)
            if (!mongoose.Types.ObjectId.isValid(id))
                return;
        if (!id)
            return;
        await models_1.interestModel.findByIdAndUpdate(id, activity);
        return await models_1.interestModel.findById(id);
    }
    async create(activity) {
        const newActivity = new models_1.interestModel(activity);
        return await newActivity.save();
    }
};
InterestService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], InterestService);
exports.default = InterestService;
//# sourceMappingURL=interestService.js.map