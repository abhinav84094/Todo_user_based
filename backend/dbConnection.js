import mongoose from "mongoose"

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected Successfully");
    }
    catch(err){
        console.log("There is something error in connnecting mongodb ", err);
    }
}
