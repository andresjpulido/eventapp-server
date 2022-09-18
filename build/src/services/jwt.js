"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
const jwt = require("jsonwebtoken");
function createToken(email, id, username) {
    const token = jwt.sign({ email: email, id: id, username: username }, process.env.JWT_API_KEY, { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN });
    return token;
}
exports.createToken = createToken;
function decodeToken(token) {
    let id = "";
    try {
        var _decoded = jwt.verify(token, process.env.JWT_API_KEY);
        var decoded = jwt.decode(token, { complete: true });
        id = decoded.payload.id;
    }
    catch (err) {
        console.log(err);
    }
    return id;
}
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.js.map