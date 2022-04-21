"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicModel = exports.activityModel = exports.progressionModel = exports.eventModel = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema_1 = __importDefault(require("./userSchema"));
const eventSchema_1 = __importDefault(require("./eventSchema"));
const progressionSchema_1 = __importDefault(require("./progressionSchema"));
const activitySchema_1 = __importDefault(require("./activitySchema"));
const topicSchema_1 = __importDefault(require("./topicSchema"));
const userModel = (0, mongoose_1.model)("User", userSchema_1.default);
exports.userModel = userModel;
const eventModel = (0, mongoose_1.model)("Event", eventSchema_1.default);
exports.eventModel = eventModel;
const progressionModel = (0, mongoose_1.model)("Progression", progressionSchema_1.default);
exports.progressionModel = progressionModel;
const activityModel = (0, mongoose_1.model)("Activity", activitySchema_1.default);
exports.activityModel = activityModel;
const topicModel = (0, mongoose_1.model)("Topic", topicSchema_1.default);
exports.topicModel = topicModel;
//# sourceMappingURL=index.js.map