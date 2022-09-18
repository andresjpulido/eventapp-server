"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    participants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Message",
        }
    ]
}, {
    timestamps: true,
});
exports.default = conversationSchema;
//# sourceMappingURL=conversationSchema.js.map