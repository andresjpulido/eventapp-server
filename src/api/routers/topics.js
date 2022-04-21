import { Router, Request, Response } from "express";
import topicsService from "../../services/activitiesService";
import { Container } from "typedi";

const auth = require("../middlewares/auth");
const route = Router();

export default (app) => {
	app.get("/topics", async (req, res, next) => {
		
        let queryObj = req.query;
		let list = [];
        const serviceInstance = Container.get(topicsService);

		if (typeof queryObj !== "object") queryObj = {};
		 
		list = await serviceInstance.get(queryObj);
		
		if (list.length == 0) return res.status(404).end();
 
		//await new Promise(r => setTimeout(r, 3000));

		return res.json(list);
	});
	app.get("/topics/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;
		let queryObj = { _id: id };
		let list = [];

		const serviceInstance = Container.get(topicsService);
		 
		list = await serviceInstance.get(queryObj);
		
		if (list.length == 0) return res.status(404).end();
		
		return res.json(list[0]);
	});
	app.put("/topics/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;
		let list = [];
		
		const serviceInstance = Container.get(topicsService);
		
		console.log(req.body);
		list = await serviceInstance.update(id, req.body);

		return res.json(list);
	});
	app.post("/topics", async (req, res, next) => {
		//Validate params

		let activity = req.body;

		if (
			activity.title === undefined ||
			activity.latitude === undefined ||
			activity.longitude === undefined ||
			activity.url === undefined ||
			activity.description === undefined
		)
			return res.status(400).end();

		const serviceInstance = Container.get(topicsService);
		let list = [];
		list = await serviceInstance.create(activity);

		return res.json(list);
	});
	app.delete("/topics/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;

		const serviceInstance = Container.get(topicsService);

		let obj = await serviceInstance.delete(id);

		if (!obj) return res.status(404).end();
		return res.json(id);
	});
};
