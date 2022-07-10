import { Service } from "typedi";
import { groupModel } from "../db/models";
const mongoose = require("mongoose");

@Service()
export default class GroupService {
	constructor() {}

	public async get(queryObj) {
		if (queryObj._id)
			if (!mongoose.Types.ObjectId.isValid(queryObj._id)) queryObj._id = null;

		return await groupModel.find(queryObj).populate("interests").populate("city");
	}

	public async delete(activityId) {
		  
		if (activityId) if (!mongoose.Types.ObjectId.isValid(activityId)) return null;

		if (!activityId) return null;
  
		return await groupModel.findByIdAndDelete(activityId);
	}

	public async update(id, activity) {
		if (id) if (!mongoose.Types.ObjectId.isValid(id)) return;

		if (!id) return;
 
		await groupModel.findByIdAndUpdate(id, activity);
		return await groupModel.findById(id);
	}

	public async create(activity) {
		const newActivity = new groupModel(activity);
		return await newActivity.save();
	}
}
