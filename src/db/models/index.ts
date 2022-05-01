import { model } from "mongoose";
import UserSchema from "./userSchema";
import eventSchema from "./eventSchema";
import ProgressionSchema from "./progressionSchema";
import activitySchema from "./activitySchema";
import citySchema from "./citySchema";
import groupSchema from "./groupSchema";
import labelSchema from "./labelSchema";

const userModel = model("User", UserSchema);
const eventModel = model("Event", eventSchema);
const progressionModel = model("Progression", ProgressionSchema);
const activityModel = model("Activity", activitySchema);
const cityModel = model("City", citySchema);
const groupModel = model("Group", groupSchema);
const labelModel = model("Label", labelSchema);

export { cityModel, userModel, eventModel, progressionModel, activityModel, groupModel, labelModel };
