"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    text: {
        type: String,
        required: true,
    },
    pending: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
exports.default = messageSchema;
//# sourceMappingURL=messageSchema.js.map