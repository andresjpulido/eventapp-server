require("dotenv").config();

var mongoose = require("mongoose");
var _ = require("lodash");
var eventsData = require("./events.json");
var usersData = require("./users.json");
var cityData = require("./cities.json");

let model = null;
let userIds = [];
let cityIds = [];
let creatorCont = 0;

import { exit } from "process";
import { userModel, eventModel, cityModel } from "../src/db/models";

mongoose.connect(
	`mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// once the connection is established we define our schemas
db.once("open", async function callback() {
	console.log(
		"connected! " + process.env.MONGODB_HOST + " " + process.env.MONGODB_DBNAME
	);

	await remove(userModel);
	await remove(eventModel);
	await remove(cityModel);

	for (var i = 0; i < cityData.length; i++) {
		model = await new cityModel(cityData[i]).save();
		cityIds.push(model._id);
	}

	for (var i = 0; i < usersData.length; i++) {
		model = await new userModel(usersData[i]).save();
		userIds.push(model._id);
	}

	for (var i = 0; i < eventsData.length; i++) {
		eventsData[i].creator = { _id: 0 };
		eventsData[i].city = { _id: 0 };
		eventsData[i].attendees = [];

		eventsData[i].creator._id = userIds[creatorCont]._id;
		eventsData[i].city._id = cityIds[0]._id;

		if (userIds.length - 1 > creatorCont + 1) {
			eventsData[i].attendees.push(userIds[creatorCont + 1]._id);
		} else {
			eventsData[i].attendees.push(userIds[creatorCont - 1]._id);
		}
		eventsData[i].attendees.push(userIds[creatorCont]._id);


		await new eventModel(eventsData[i]).save();

		if (userIds.length - 1 > creatorCont) creatorCont = creatorCont + 1;
		else creatorCont = 0;
	}

	mongoose.connection.close();
	process.exit(1);
});

console.log("done!");
//
const remove = async (model) => {
	await model.find().deleteMany();
};
