import { Schema } from "mongoose";

const activitySchema = new Schema(
	{ 
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		}	
	},
	{
		timestamps: true,
	}
);

export default activitySchema;
