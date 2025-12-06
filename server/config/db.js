import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vickeyyadav0088_db_user:mnFpfcExq6uPmgGb@cluster0.mwf0tez.mongodb.net/",
      { dbName: "UserLoginRegisterData" }
    );
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

export default connectDB;
