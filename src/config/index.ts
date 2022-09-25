const dotenv = require("dotenv"); 
dotenv.config();

export default {
	api: {
		prefix: '/api',
	  },
	port: process.env.PORT,	 
	MONGODB_USER: process.env.MONGODB_USER,
	MONGODB_HOST: process.env.MONGODB_HOST,
	MONGODB_DBNAME:process.env.MONGODB_DBNAME,
	MONGODB_PASSWORD:process.env.MONGODB_PASSWORD,
	MONGODB_PORT:process.env.MONGODB_PORT
};