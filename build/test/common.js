"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _req = (0, supertest_1.default)("http://l192.168.20.16:4000");
var username = process.env.BASIC_AUTH_USERNAME;
var password = process.env.BASIC_AUTH_PASSWORD;
var token = Buffer.from(username + ':' + password).toString('base64');
/*
export default {
    request, token
};
*/
module.exports = {
    _req, token
};
//# sourceMappingURL=common.js.map