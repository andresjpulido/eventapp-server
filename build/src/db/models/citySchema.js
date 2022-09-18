"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const citySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = citySchema;
//# sourceMappingURL=citySchema.js.map