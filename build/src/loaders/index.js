"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const mongoose_1 = __importDefault(require("./mongoose"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongoose_1.default)();
    await (0, express_1.default)({ app: expressApp });
    // ... más cargadores pueden estar aquí
    // ... Iniciar agenda
    // ... o Redis, o lo que quieras
};
//# sourceMappingURL=index.js.map