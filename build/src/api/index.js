"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./routers/auth"));
const user_1 = __importDefault(require("./routers/user"));
const progressions_1 = __importDefault(require("./routers/progressions"));
const activity_1 = __importDefault(require("./routers/activity"));
const topics_1 = __importDefault(require("./routers/topics"));
const event_1 = __importDefault(require("./routers/event"));
const group_1 = __importDefault(require("./routers/group"));
const interest_1 = __importDefault(require("./routers/interest"));
const chat_1 = __importDefault(require("./routers/chat"));
const city_1 = __importDefault(require("./routers/city"));
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, user_1.default)(app);
    (0, progressions_1.default)(app);
    (0, activity_1.default)(app);
    (0, topics_1.default)(app);
    (0, event_1.default)(app);
    (0, group_1.default)(app);
    (0, interest_1.default)(app);
    (0, auth_1.default)(app);
    (0, chat_1.default)(app);
    (0, city_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map