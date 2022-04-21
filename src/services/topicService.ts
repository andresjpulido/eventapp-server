import { Service } from "typedi";
import { topicModel } from "../db/models";
const mongoose = require("mongoose");

@Service()
export default class ActivityService {
	constructor() {}

	public async get(queryObj) {
		if (queryObj._id)
			if (!mongoose.Types.ObjectId.isValid(queryObj._id)) queryObj._id = null;

		return await topicModel.find(queryObj);
	}

	public async delete(activityId) {
		  
		if (activityId) if (!mongoose.Types.ObjectId.isValid(activityId)) return null;

		if (!activityId) return null;
  
		return await topicModel.findByIdAndDelete(activityId);
	}

	public async update(id, activity) {
		if (id) if (!mongoose.Types.ObjectId.isValid(id)) return;

		if (!id) return;
 
		await topicModel.findByIdAndUpdate(id, activity);
		return await topicModel.findById(id);
	}

	public async create(activity) {
		const newActivity = new topicModel(activity);
		return await newActivity.save();
	}
}
