import mongoose from "mongoose";
import model from '../config';

export default async function connect() {
	try {
		await mongoose.connect(`mongodb://${model.MONGODB_USER}:${model.MONGODB_PASSWORD}@${model.MONGODB_HOST}:${model.MONGODB_PORT}/${model.MONGODB_DBNAME}`, {});
		console.log("DB Connected")
		//mongoose.connection.db.dropDatabase();
		 
	} catch (error) {
		console.log("Error connecting to DB", error);
	}
}
