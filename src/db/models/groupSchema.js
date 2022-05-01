import { Schema } from "mongoose";

const groupSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		city: {
			type: Schema.Types.ObjectId,
			ref: "City",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default groupSchema;
