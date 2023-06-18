"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const port = config_1.default.PORT;
// Connect Database
mongoose_1.default
    .connect(config_1.default.MONGODB_URI)
    .then(() => console.log("Database connceted successfully ✅"))
    .catch((err) => console.log(`Unable to connect MongoDB ❌ ${err}`));
// Listen to Server
const server = app_1.default.listen(port, () => {
    console.log(`Server is running on port ${port} ✅`);
});
// Unhandled Rejection: Gracefully off the server
process.on("unhandledRejection", (error) => {
    console.log(`Unhandled Reject is closing the server ❌ ${error}`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
