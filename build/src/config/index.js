"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = {
    api: {
        prefix: '/api',
    },
    port: process.env.PORT,
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_HOST: process.env.MONGODB_HOST,
    MONGODB_DBNAME: process.env.MONGODB_DBNAME
};
//# sourceMappingURL=index.js.map