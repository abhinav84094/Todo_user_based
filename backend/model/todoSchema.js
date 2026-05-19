import mongoose, { Mongoose } from "mongoose";

const todoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Users"
    }
})


const Todos = mongoose.model("Todos", todoSchema)

export default Todos;
