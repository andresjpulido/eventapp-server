import authService from "../../services/authService";
import { Container } from "typedi";

export default (app) => {
	app.post("/signup", async (req, res, next) => {
		const { password, passwordConfirmation, email, username } = req.body;
		const serviceInstance = Container.get(authService);

		//validate input
		let user = {
			name: username,
			password: password,
			email: email,
		};

		let userBD = await serviceInstance.signup(user);
	 
		return res.json(userBD);

	});

	app.get("/signin", async (req, res, next) => {
		let list = [];
/*
		try {
			const queryObj = req.query;
			const serviceInstance = Container.get(userService);

			list = await serviceInstance.get(queryObj);
		} catch (e) {
			console.log(e);
		}
		return res.json(list);
		*/
		console.log("ok");
		return res.json("ok");
	});

	app.get("/signout", async (req, res, next) => {
		try {
		} catch (e) {
			console.log(e);
		}
		return res.json(true);
	});

	app.get("/whoami", async (req, res, next) => {
		let token = req.body.token;
		console.log(token);

		let list = [];

		return res.json(token);
	});
};
