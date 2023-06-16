import mongoose from "mongoose";
import app from "./app";
import config from "./config";
const port = config.PORT;

// Connect Database
mongoose
  .connect(config.MONGODB_URI as string)
  .then(() => console.log("Database connceted successfully ✅"))
  .catch((err) => console.log(`Unable to connect MongoDB ❌ ${err}`));

// Listen to Server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port} ✅`);
});

// Unhandled Rejection: Gracefully off the server
process.on("unhandledRejection", (error) => {
  console.log(`Unhandled Reject is closing the server ❌ ${error}`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
