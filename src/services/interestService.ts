import { Service } from "typedi";
import { interestModel } from "../db/models";
const mongoose = require("mongoose");

@Service()
export default class InterestService {
	constructor() {}

	public async get(queryObj) {
		if (queryObj._id)
			if (!mongoose.Types.ObjectId.isValid(queryObj._id)) queryObj._id = null;

		return await interestModel.find(queryObj);
	}

	public async delete(activityId) {
		  
		if (activityId) if (!mongoose.Types.ObjectId.isValid(activityId)) return null;

		if (!activityId) return null;
  
		return await interestModel.findByIdAndDelete(activityId);
	}

	public async update(id, activity) {
		if (id) if (!mongoose.Types.ObjectId.isValid(id)) return;

		if (!id) return;
 
		await interestModel.findByIdAndUpdate(id, activity);
		return await interestModel.findById(id);
	}

	public async create(activity) {
		const newActivity = new interestModel(activity);
		return await newActivity.save();
	}
}
