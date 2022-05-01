import { Schema } from "mongoose";

const labelSchema = new Schema(
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

export default labelSchema;
