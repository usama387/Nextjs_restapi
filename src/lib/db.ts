import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// An async function which connects the app with db using same connection
const connectToDb = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Mongo DB is already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("Connecting");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "restapinext14",
      bufferCommands: false,
    });
    console.log("Connected");
  } catch (error) {
    console.log("Cannot connect!", error);
    throw new  Error(`Error connecting to Mongo DB ${error}`);
  }
};

export default connectToDb;