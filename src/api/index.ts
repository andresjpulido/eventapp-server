import { Router } from "express";
import auth from "./routers/auth";
import user from "./routers/user";
import progressions from "./routers/progressions";
import activity from "./routers/activity";
import topic from "./routers/topics";
import event from "./routers/event";
import group from "./routers/group";
import label from "./routers/interest";
import chat from "./routers/chat";
import city from "./routers/city"; 

export default () => {
	const app = Router();

	user(app);
	progressions(app);
	activity(app);
	topic(app);
	event(app);
	group(app);
	label(app);
	auth(app);
	chat(app);
	city(app); 

	return app;
};
