"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const interestSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
exports.default = interestSchema;
//# sourceMappingURL=interestSchema.js.map