import { model } from "mongoose";
import UserSchema from "./userSchema";
import eventSchema from "./eventSchema";
import ProgressionSchema from "./progressionSchema";
import activitySchema from "./activitySchema";
import citySchema from "./citySchema";
import groupSchema from "./groupSchema";
import interestSchema from "./interestSchema";
import conversationSchema from "./conversationSchema";
import messageSchema from "./messageSchema";
import topicSchema from "./topicSchema";

const userModel = model("User", UserSchema);
const eventModel = model("Event", eventSchema);
const progressionModel = model("Progression", ProgressionSchema);
const activityModel = model("Activity", activitySchema);
const cityModel = model("City", citySchema);
const groupModel = model("Group", groupSchema);
const interestModel = model("Interest", interestSchema);
const conversationModel = model("Conversation", conversationSchema);
const messageModel = model("Message", messageSchema);
const topicModel = model("TopicModel", topicSchema);

export { cityModel, userModel, eventModel, progressionModel, activityModel, groupModel, interestModel, conversationModel, messageModel , topicModel};
