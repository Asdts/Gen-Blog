import mongoose from "mongoose";

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.once("connected", () => {
            console.log("Connected to MongoDB");
        });
        connection.on("error", (err) => {
            console.log("Error: ", err);
            process.exit();
        });
    }catch(err){
        console.log(err);
    }
}