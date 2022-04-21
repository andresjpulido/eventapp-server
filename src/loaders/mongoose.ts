import mongoose from "mongoose";
import model from '../config';

export default async function connect() {
	try {
		await mongoose.connect(`mongodb://${model.MONGODB_HOST}/${model.MONGODB_DBNAME}`, {});
		console.log("connected to DB")
		 
	} catch (error) {
		console.log(error.description);
	}
}
