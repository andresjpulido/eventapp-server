import { Schema } from "mongoose";

const progressionSchema = new Schema(
	{ 
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		user: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default progressionSchema;
