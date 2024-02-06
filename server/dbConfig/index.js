import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
      // const connection = await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Connected ");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export default dbConnection;
