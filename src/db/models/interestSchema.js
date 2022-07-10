import { Schema } from "mongoose";

const interestSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		} 
	},
	{
		timestamps: true,
	}
);

export default interestSchema;
