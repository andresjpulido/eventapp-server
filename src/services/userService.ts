import { Service } from "typedi"; 
import {userModel}  from "../db/models";
 
@Service()
export default class userService {
	constructor() {}
 
	public async get(queryObj) {
		return await userModel.find(queryObj);
	}

	public async delete(progressionId: String) {
		await userModel.findByIdAndDelete(progressionId);
	}

	public async update(id, progression) {
		await userModel.findByIdAndUpdate(id, progression);
		return await userModel.find();
	}

	public async create(progression) {
		const newProgression = new userModel(progression);
		return await newProgression.save();
	}
}
