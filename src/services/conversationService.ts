import { Service } from "typedi";
import { conversationModel } from "../db/models";
const mongoose = require("mongoose");

@Service()
export default class ConversationService {
	constructor() {}

	public async get(queryObj) {
		if (queryObj._id)
			if (!mongoose.Types.ObjectId.isValid(queryObj._id)) queryObj._id = null;

		return await conversationModel.find(queryObj).populate("participants").populate("messages");
	}

	public async talkers(userId) {
		if (userId) if (!mongoose.Types.ObjectId.isValid(userId)) userId._id = null;

		return await conversationModel
			.find({
				$or: [{ to: userId }, { from: userId }],
				$group: {
					_id: null,
					createdAt: { $max: "$createdAt" },
				},
			})
			.populate("to")
			.populate("from");
	}

	public async delete(activityId) {
		if (activityId)
			if (!mongoose.Types.ObjectId.isValid(activityId)) return null;

		if (!activityId) return null;

		return await conversationModel.findByIdAndDelete(activityId);
	}

	public async update(id, activity) {
		if (id) if (!mongoose.Types.ObjectId.isValid(id)) return;

		if (!id) return;

		await conversationModel.findByIdAndUpdate(id, activity);
		return await conversationModel.findById(id);
	}

	public async create(activity) {
		const newActivity = new conversationModel(activity);
		return await newActivity.save();
	}
}
