"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
async function connect() {
    try {
        await mongoose_1.default.connect(`mongodb://${config_1.default.MONGODB_HOST}/${config_1.default.MONGODB_DBNAME}`, {});
        console.log("DB Connected");
        //mongoose.connection.db.dropDatabase();
    }
    catch (error) {
        console.log("Error connecting to DB", error.description);
    }
}
exports.default = connect;
//# sourceMappingURL=mongoose.js.map