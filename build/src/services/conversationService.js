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
let ConversationService = class ConversationService {
    constructor() { }
    async get(queryObj) {
        if (queryObj._id)
            if (!mongoose.Types.ObjectId.isValid(queryObj._id))
                queryObj._id = null;
        return await models_1.conversationModel.find(queryObj).populate("participants").populate("messages");
    }
    async talkers(userId) {
        if (userId)
            if (!mongoose.Types.ObjectId.isValid(userId))
                userId._id = null;
        return await models_1.conversationModel
            .find({
            $or: [{ to: userId }, { from: userId }],
            $group: {
                _id: null,
                createdAt: { $max: "$createdAt" },
            },
        })
            .populate("to")
            .populate("from");
    }
    async delete(activityId) {
        if (activityId)
            if (!mongoose.Types.ObjectId.isValid(activityId))
                return null;
        if (!activityId)
            return null;
        return await models_1.conversationModel.findByIdAndDelete(activityId);
    }
    async update(id, activity) {
        if (id)
            if (!mongoose.Types.ObjectId.isValid(id))
                return;
        if (!id)
            return;
        await models_1.conversationModel.findByIdAndUpdate(id, activity);
        return await models_1.conversationModel.findById(id);
    }
    async create(activity) {
        const newActivity = new models_1.conversationModel(activity);
        return await newActivity.save();
    }
};
ConversationService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], ConversationService);
exports.default = ConversationService;
//# sourceMappingURL=conversationService.js.map