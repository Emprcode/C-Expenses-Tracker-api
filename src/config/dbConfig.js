import mongoose from "mongoose";

export const connectMongoDB = () => {
  try {
    const mongoUrl = process.env.MONGODB_URL
    mongoose.set("strictQuery", true); // to suppress the warning in the console
    const conn = mongoose.connect(mongoUrl);
    conn && console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message, "from ConnectMongoDB function");
  }
};
