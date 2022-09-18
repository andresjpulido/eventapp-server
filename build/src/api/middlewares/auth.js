"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../services/jwt");
function isAuth(req, res, next) {
    console.log(req.headers);
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorización' });
    }
    const token = req.headers.authorization.split(" ")[1];
    (0, jwt_1.decodeToken)(token);
    next();
}
/*

 */
module.exports = isAuth;
//# sourceMappingURL=auth.js.map