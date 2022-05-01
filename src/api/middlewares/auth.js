"use strict";
import {decodeToken} from '../../services/jwt';

 function isAuth(req, res, next) {
	console.log(req.headers);

	if (!req.headers.authorization) {
		return res.status(403).send({ message: 'No tienes autorización' })
	}


	const token = req.headers.authorization.split(" ")[1];

    decodeToken(token);

    next()
}
/*

 */
module.exports = isAuth