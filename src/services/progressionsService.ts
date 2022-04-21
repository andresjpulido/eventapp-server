import { Service } from "typedi";
import { progressionModel } from "../db/models";

@Service()
export default class ProgressionsService {
	constructor() {}

	public async get(queryObj) {
		return await progressionModel.find(queryObj);
	}

	public async delete(progressionId: String) {
		await progressionModel.findByIdAndDelete(progressionId);
	}

	public async update(id, progression) {
		await progressionModel.findByIdAndUpdate(id, progression);
		return await progressionModel.find();
	}

	public async create(progression) {
		const newProgression = new progressionModel(progression);
		return await newProgression.save();
	}
}
