import { Router, Request, Response } from "express";
import groupService from "../../services/groupService";
import { Container } from "typedi";

const auth = require("../middlewares/auth");
const route = Router();

export default (app) => {
	app.get("/groups", async (req, res, next) => {
		let queryObj = req.query;
		let list = [];

		console.log("query: " + JSON.stringify(queryObj))
		
		if (typeof queryObj !== "object") queryObj = {};
		
		const serviceInstance = Container.get(groupService);
		
		list = await serviceInstance.get(queryObj);
		
		if (list.length == 0) return res.status(404).end();
 
		//await new Promise(r => setTimeout(r, 3000));

		return res.json(list);
	});
	app.get("/groups/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;
		let queryObj = { _id: id };
		let list = [];

		const serviceInstance = Container.get(groupService);
		 
		list = await serviceInstance.get(queryObj);
		
		if (list.length == 0) return res.status(404).end();
		
		return res.json(list[0]);
	});
	app.put("/groups/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;
		let list = [];
		
		const serviceInstance = Container.get(groupService);
		
		console.log(req.body);
		list = await serviceInstance.update(id, req.body);

		return res.json(list);
	});
	app.post("/groups", async (req, res, next) => {
		//Validate params

		let activity = req.body;
		console.log(activity)

		if (
			activity.title === undefined  
		)
			return res.status(400).end();


	 

		const serviceInstance = Container.get(groupService);
		let list = [];
		list = await serviceInstance.create(activity);

		return res.json(list);
	});
	app.delete("/groups/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;

		const serviceInstance = Container.get(groupService);

		let obj = await serviceInstance.delete(id);

		if (!obj) return res.status(404).end();
		return res.json(id);
	});
};
