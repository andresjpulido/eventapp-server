import { Service } from "typedi";
import { activityModel } from "../db/models";
const mongoose = require("mongoose");

@Service()
export default class ActivityService {
	constructor() {}

	public async get(queryObj) {
		if (queryObj._id)
			if (!mongoose.Types.ObjectId.isValid(queryObj._id)) queryObj._id = null;

		return await activityModel.find(queryObj);
	}

	public async delete(activityId) {
		  
		if (activityId) if (!mongoose.Types.ObjectId.isValid(activityId)) return null;

		if (!activityId) return null;
  
		return await activityModel.findByIdAndDelete(activityId);
	}

	public async update(id, activity) {
		if (id) if (!mongoose.Types.ObjectId.isValid(id)) return;

		if (!id) return;
 
		await activityModel.findByIdAndUpdate(id, activity);
		return await activityModel.findById(id);
	}

	public async create(activity) {
		const newActivity = new activityModel(activity);
		return await newActivity.save();
	}
}
