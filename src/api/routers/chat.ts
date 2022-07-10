import { Router, Request, Response } from "express";
import conversationService from "../../services/conversationService";
import { Container } from "typedi";

const auth = require("../middlewares/auth");
const route = Router();

export default (app) => {
	app.get("/chat", async (req, res, next) => {
		let queryObj = req.query;
		let list = [];

		console.log("query: " + JSON.stringify(queryObj));

		if (typeof queryObj !== "object") queryObj = {};

		const serviceInstance = Container.get(conversationService);

		list = await serviceInstance.get(queryObj);

		if (list.length == 0) return res.status(404).end();

		//await new Promise(r => setTimeout(r, 3000));

		return res.json(list);
	});

	app.get("/chat/talkers/:userId", async (req, res, next) => {
		let userId = req.params.userId;
		let list = [];

		if (userId === "") return res.status(404).end();

		const serviceInstance = Container.get(conversationService);

		list = await serviceInstance.talkers(userId);

		if (list.length == 0) return res.status(404).end();

		return res.json(list);
	});

	app.get("/chat/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;
		let queryObj = { _id: id };
		let list = [];

		const serviceInstance = Container.get(conversationService);

		list = await serviceInstance.get(queryObj);

		if (list.length == 0) return res.status(404).end();

		return res.json(list[0]);
	});

	app.put("/chat/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;
		let list = [];

		const serviceInstance = Container.get(conversationService);

		console.log(req.body);
		await serviceInstance.update(id, req.body);

		return res.json(list);
	});

	app.post("/chat", async (req, res, next) => {
		//Validate params

		let activity = req.body;
		console.log(activity);

		if (activity.title === undefined) return res.status(400).end();

		const serviceInstance = Container.get(conversationService);
		await serviceInstance.create(activity);

		return res.json({});
	});

	app.delete("/chat/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;

		const serviceInstance = Container.get(conversationService);

		let obj = await serviceInstance.delete(id);

		if (!obj) return res.status(404).end();
		return res.json(id);
	});
};
