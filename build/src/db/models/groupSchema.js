"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const groupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    city: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "City",
        required: true,
    },
    interests: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Interest",
        },
    ],
}, {
    timestamps: true,
});
exports.default = groupSchema;
//# sourceMappingURL=groupSchema.js.map