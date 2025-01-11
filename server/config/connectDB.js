import mongoose from "mongoose";

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.MONGODBURI)
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(err));
};

export default connectDatabase;




