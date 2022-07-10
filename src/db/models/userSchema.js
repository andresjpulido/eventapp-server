import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import Progression from "./progressionSchema";

const UserSchema = new Schema(
	{
		name: { type: String, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			///validate: (value) => validator.isEmail(value),
		},
		password: { type: String, required: true },
		city: {
			type: Schema.Types.ObjectId,
			ref: "City",
			required: true,
		},
		events: [
			{
				type: Schema.Types.ObjectId,
				ref: "Event",
			},
		],
		groups: [
			{
				type: Schema.Types.ObjectId,
				ref: "Group",
			},
		],
		conversations:[
			{
				type: Schema.Types.ObjectId,
				ref: "Conversation",
			},
		]
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

UserSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
	this.password = await UserSchema.methods.encryptPassword(this.password);
	next();
});

export default UserSchema;
