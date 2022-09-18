import { Service } from "typedi";
import { userModel } from "../db/models";

@Service()
export default class userService {
	constructor() {}

	public async get(queryObj) {
		return await userModel.find(queryObj).populate("city");
	}

	public async delete(progressionId: String) {
		await userModel.findByIdAndDelete(progressionId);
	}

	public async update(id, progression) {
		await userModel.findByIdAndUpdate(id, progression);
		return await userModel.find();
	}

	public async create(user) {
		let newUser = new userModel(user);
		newUser.city = {
			id:""
		}
		return await newUser.save();
	 
	}
}
