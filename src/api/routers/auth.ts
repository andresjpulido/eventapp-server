import userService from "../../services/userService";
import { Container } from "typedi";

//const auth = require("../middlewares/auth");

export default (app) => {
	app.get("/users2", async (req, res, next) => {
		let list = [];
		try {
			const queryObj = req.query;
			const serviceInstance = Container.get(userService);

			list = await serviceInstance.get(queryObj);
		} catch (e) {
			console.log(e);
		}
		return res.json(list);
	});
};
