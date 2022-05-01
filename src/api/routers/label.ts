import { Router, Request, Response } from "express";
import labelService from "../../services/labelService";
import { Container } from "typedi";

const auth = require("../middlewares/auth");
const route = Router();

export default (app) => {
	app.get("/labels", async (req, res, next) => {
		let queryObj = req.query;
		let list = [];

		console.log("query: " + JSON.stringify(queryObj))
		
		if (typeof queryObj !== "object") queryObj = {};
		
		const serviceInstance = Container.get(labelService);
		
		list = await serviceInstance.get(queryObj);
		
		if (list.length == 0) return res.status(404).end();
 
		//await new Promise(r => setTimeout(r, 3000));

		return res.json(list);
	});
	app.get("/labels/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;
		let queryObj = { _id: id };
		let list = [];

		const serviceInstance = Container.get(labelService);
		 
		list = await serviceInstance.get(queryObj);
		
		if (list.length == 0) return res.status(404).end();
		
		return res.json(list[0]);
	});
	app.put("/labels/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;
		let list = [];
		
		const serviceInstance = Container.get(labelService);
		
		console.log(req.body);
		list = await serviceInstance.update(id, req.body);

		return res.json(list);
	});
	app.post("/labels", async (req, res, next) => {
		//Validate params

		let activity = req.body;
		console.log(activity)

		if (
			activity.title === undefined  
		)
			return res.status(400).end();


	 

		const serviceInstance = Container.get(labelService);
		let list = [];
		list = await serviceInstance.create(activity);

		return res.json(list);
	});
	app.delete("/labels/:id", async (req, res, next) => {
		//Validate params
		const id = req.params.id;

		const serviceInstance = Container.get(labelService);

		let obj = await serviceInstance.delete(id);

		if (!obj) return res.status(404).end();
		return res.json(id);
	});
};
