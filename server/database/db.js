import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM",
    })
    .then(() => {
        console.log("Database connected Successfully");
    })
    .catch ((err) => {
        console.log("Error connecting to database", err);
    })
}
// mongodb://localhost:27017
// mongodb+srv://amirkhanafridi959:amir5721@cluster0.ivum29u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
