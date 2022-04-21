import { Service } from "typedi";
import { eventModel, userModel } from "../db/models";

const mongoose = require("mongoose");

@Service()
export default class EventService {
	constructor() {}

	public async get(queryObj) {
		if (queryObj._id)
			if (!mongoose.Types.ObjectId.isValid(queryObj._id)) queryObj._id = null;

		return await eventModel.find(queryObj).populate("creator").populate("city");
	}

	public async delete(activityId) {
		  
		if (activityId) if (!mongoose.Types.ObjectId.isValid(activityId)) return null;

		if (!activityId) return null;
  
		return await eventModel.findByIdAndDelete(activityId);
	}

	public async update(id, activity) {
		if (id) if (!mongoose.Types.ObjectId.isValid(id)) return;

		if (!id) return;
 
		await eventModel.findByIdAndUpdate(id, activity);
		return await eventModel.findById(id);
	}

	public async create(activity) {
		const newActivity = new eventModel(activity);
		return await newActivity.save();
	}
}
