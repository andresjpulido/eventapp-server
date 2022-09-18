import { Router, Request, Response } from "express";
import userService from "../../services/userService";
import { Container } from "typedi";

import middlewares from '../middlewares';
const route = Router();

export default (app) => {
	
	app.get("/users", middlewares.auth, async (req, res, next) => {
		const queryObj = req.query;
		const serviceInstance = Container.get(userService);
		let list = [];
		list = await serviceInstance.get(queryObj);
		return res.json(list);
	});
	app.get("/users/:id", async (req, res, next) => {
		const serviceInstance = Container.get(userService);
		const id = req.params.id;
		const list = await serviceInstance.get(id);
		return res.json(list);
	});
	app.put("/users/:id", async (req, res, next) => {
        const id = req.params.id;
		const serviceInstance = Container.get(userService);
		const list = await serviceInstance.update(id, req.body);
		return res.json(list);
	});
	app.post("/users", async (req, res, next) => {
		const serviceInstance = Container.get(userService);
		const list = await serviceInstance.create(req.body);
		return res.json(list);
	});
	app.delete("/users/:id", async (req, res, next) => {
		const serviceInstance = Container.get(userService);
		const id = req.params.id;
		const list = await serviceInstance.delete(id);
		return res.json(list);
	});
};
