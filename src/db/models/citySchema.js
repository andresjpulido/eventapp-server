import { Schema } from "mongoose";

const citySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		region: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default citySchema;
