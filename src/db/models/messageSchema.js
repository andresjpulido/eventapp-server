import { Schema } from "mongoose";

const messageSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		text: {
			type: String,
			required: true,
		},
		pending: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export default messageSchema;
