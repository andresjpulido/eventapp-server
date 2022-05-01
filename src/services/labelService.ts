import { Service } from "typedi";
import { labelModel } from "../db/models";
const mongoose = require("mongoose");

@Service()
export default class LabelService {
	constructor() {}

	public async get(queryObj) {
		if (queryObj._id)
			if (!mongoose.Types.ObjectId.isValid(queryObj._id)) queryObj._id = null;

		return await labelModel.find(queryObj);
	}

	public async delete(activityId) {
		  
		if (activityId) if (!mongoose.Types.ObjectId.isValid(activityId)) return null;

		if (!activityId) return null;
  
		return await labelModel.findByIdAndDelete(activityId);
	}

	public async update(id, activity) {
		if (id) if (!mongoose.Types.ObjectId.isValid(id)) return;

		if (!id) return;
 
		await labelModel.findByIdAndUpdate(id, activity);
		return await labelModel.findById(id);
	}

	public async create(activity) {
		const newActivity = new labelModel(activity);
		return await newActivity.save();
	}
}
