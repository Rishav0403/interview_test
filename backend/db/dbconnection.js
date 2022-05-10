import mongoose from "mongoose";

const dbConnect = () => {
  mongoose.connect("mongodb://localhost:27017/interviewQuadbtech").then(() => {
    console.log("connected to Db...");
  }).catch((err) => {
    console.log(err);
  })
}

export default dbConnect;