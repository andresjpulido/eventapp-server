require("dotenv").config();

var mongoose = require("mongoose");
var _ = require("lodash");
var eventsData = require("./events.json");
var usersData = require("./users.json");
var cityData = require("./cities.json");
var groupData = require("./groups.json");
var labelsData = require("./labels.json");

let model = null;
let userIds = [];
let cityIds = [];
let groupIds = [];
let creatorCont = 0;
let groupCont = 0;

import { exit } from "process";
import {
	userModel,
	eventModel,
	cityModel,
	groupModel,
	labelModel,
} from "../src/db/models";

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
	await remove(groupModel);
	await remove(labelModel);

	for (var i = 0; i < labelsData.length; i++) {
		await new labelModel(labelsData[i]).save();
	}

	for (var i = 0; i < cityData.length; i++) {
		model = await new cityModel(cityData[i]).save();
		cityIds.push(model._id);
	}

	for (var i = 0; i < groupData.length; i++) {
		groupData[i].city = { _id: 0 };
		groupData[i].city._id = cityIds[0]._id;
		await new groupModel(groupData[i]).save();
	}



	for (var i = 0; i < usersData.length; i++) {
		model = await new userModel(usersData[i]).save();
		userIds.push(model._id);
/*
		if (groupIds.length - 1 > groupCont + 1) {
			usersData[i].groups.push(groupIds[groupCont + 1]._id);
		} else {
			usersData[i].groups.push(groupIds[groupCont - 1]._id);
		}		
*/
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
