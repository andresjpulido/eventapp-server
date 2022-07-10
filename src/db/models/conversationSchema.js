import { Schema } from "mongoose";

const conversationSchema = new Schema(
	{
		participants: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages:[
			{
				type: Schema.Types.ObjectId,
				ref: "Message",
			}
		]
	},
	{
		timestamps: true,
	}
);

export default conversationSchema;
