"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        ///validate: (value) => validator.isEmail(value),
    },
    password: { type: String, required: true },
    city: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "City",
        required: true,
    },
    events: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
    groups: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Group",
        },
    ],
    conversations: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Conversation",
        },
    ]
}, {
    timestamps: true,
    versionKey: false,
});
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return await bcryptjs_1.default.hash(password, salt);
};
UserSchema.methods.matchPassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
UserSchema.pre("save", async function (next) {
    this.password = await UserSchema.methods.encryptPassword(this.password);
    next();
});
exports.default = UserSchema;
//# sourceMappingURL=userSchema.js.map