import { Schema } from "mongoose";

const eventSchema = new Schema(
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
			required: false,
		},
		latitude: {
			type: Number,
			required: false,
		},
		longitude: {
			type: Number,
			required: false,
		}, 
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
		city: {
			type: Schema.Types.ObjectId,
			ref: "City",
			required: true,
		},
		attendees: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		group: {
			type: Schema.Types.ObjectId,
			ref: "Group"
		}
	},
	{
		timestamps: true,
	}
);

export default eventSchema;
