import { Router, Request, Response } from "express";
import progressionService from "../../services/progressionsService";
import { Container } from "typedi";

const auth = require("../middlewares/auth");
const route = Router();

export default (app) => {

	app.get("/progressions", async (req, res, next) => {
		const queryObj = req.query;
		const serviceInstance = Container.get(progressionService);
		let list = [];

		list = await serviceInstance.get(queryObj);
		return res.json(list);
	});
	app.get("/progressions/:id", async (req, res, next) => {
		const serviceInstance = Container.get(progressionService);
		const id = req.params.id;
		const list = await serviceInstance.get(id);
		return res.json(list);
	});
	app.put("/progressions/:id", async (req, res, next) => {
        const id = req.params.id;
		const serviceInstance = Container.get(progressionService);
		const list = await serviceInstance.update(id, req.body);
		return res.json(list);
	});
	app.post("/progressions", async (req, res, next) => {
		const serviceInstance = Container.get(progressionService);
		const list = await serviceInstance.create(req.body);
		return res.json(list);
	});
	app.delete("/progressions/:id", async (req, res, next) => {
		const serviceInstance = Container.get(progressionService);
		const id = req.params.id;
		const list = await serviceInstance.delete(id);
		return res.json(list);
	});
};
