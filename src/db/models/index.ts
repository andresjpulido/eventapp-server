import { model } from "mongoose";
import UserSchema from "./userSchema";
import eventSchema from "./eventSchema";
import ProgressionSchema from "./progressionSchema";
import activitySchema from "./activitySchema";
import citySchema from "./citySchema";

const userModel = model("User", UserSchema);
const eventModel = model("Event", eventSchema);
const progressionModel = model("Progression", ProgressionSchema);
const activityModel = model("Activity", activitySchema);
const cityModel = model("City", citySchema);

export { cityModel, userModel, eventModel, progressionModel, activityModel };
