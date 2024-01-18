import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.magenta);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    process.exit;
  }
};

const createBucket = () => {
  let bucket;
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "newBucket",
    });
    console.log(bucket);
  });
};

export default connectDB;
