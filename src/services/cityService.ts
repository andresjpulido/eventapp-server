import { Service } from "typedi";
import { cityModel } from "../db/models";
const mongoose = require("mongoose");

@Service()
export default class CityService {
	constructor() {}

	public async get(queryObj) {
		if (queryObj._id)
			if (!mongoose.Types.ObjectId.isValid(queryObj._id)) queryObj._id = null;

		return await cityModel.find(queryObj);
	}

	public async delete(activityId) {
		  
		if (activityId) if (!mongoose.Types.ObjectId.isValid(activityId)) return null;

		if (!activityId) return null;
  
		return await cityModel.findByIdAndDelete(activityId);
	}

	public async update(id, activity) {
		if (id) if (!mongoose.Types.ObjectId.isValid(id)) return;

		if (!id) return;
 
		await cityModel.findByIdAndUpdate(id, activity);
		return await cityModel.findById(id);
	}

	public async create(activity) {
		const newModel = new cityModel(activity);
		return await newModel.save();
	}
}
