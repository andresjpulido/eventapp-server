"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const config_1 = __importDefault(require("./config"));
const loaders_1 = __importDefault(require("./loaders"));
const express_1 = __importDefault(require("express"));
async function startServer() {
    const app = (0, express_1.default)();
    await (0, loaders_1.default)({ expressApp: app });
    app.listen(config_1.default.port, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server is running in port ` + config_1.default.port);
    });
}
startServer();
//# sourceMappingURL=app.js.map