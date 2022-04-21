"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./routers/user"));
const progressions_1 = __importDefault(require("./routers/progressions"));
const activity_1 = __importDefault(require("./routers/activity"));
const topics_1 = __importDefault(require("./routers/topics"));
const event_1 = __importDefault(require("./routers/event"));
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, user_1.default)(app);
    (0, progressions_1.default)(app);
    (0, activity_1.default)(app);
    (0, topics_1.default)(app);
    (0, event_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map