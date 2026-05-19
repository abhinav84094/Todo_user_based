import express from "express"
import jwt from "jsonwebtoken"
import auth from "./middleware/auth.js"
import dotenv from "dotenv"
import connectDB from "./dbConnection.js"
import Users from "./model/userModel.js"
import Todos from "./model/todoSchema.js"

// const token = jwt.sign()

const app = express();
app.use(express.json())
app.use(express.static("../frontend"))
dotenv.config()


app.get("/", function home(req, res){
    res.sendFile("A:\\FULL STACK Web Development MERN\\Project\\2026\\Todo\\frontend\\login.html");
})

app.post("/login", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const user = await Users.findOne({username});
    console.log(user);
    if(user){
        if(user.password != password){
            res.status(400).json({
                message:"Incorrect Password"
            })
            return;
        }

        const token = jwt.sign(
            { userId : user._id},
            process.env.SECRET_KEY,
            { expiresIn : "24h" }
        );

        res.status(200).json({
            message: "Login Successfully", 
            token
        })

        return;
    }
    else{
        res.status(400).json({
            message:"User Not Found"
        })
    }
})

app.post("/signup", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        res.status(400).json({
            message:"please fill the details"
        })

        return;
    }

    const existingUser = await Users.findOne({username});
    if(existingUser) {
        res.status(200).json({
            message: "Username Already Exists"
        })
        return;
    }

    await Users.create({username, password});

    res.status(200).json({
        message: `${username} successfull signup`
    })
})

app.post("/todos",auth, async function(req, res){
    let todo = req.body.todo; 
    await Todos.create({
        todo,
        userId : req.user.userId
    });
    res.status(200).json({
        messages: todo
    })
})

app.get("/todos",auth, async function(req, res){
    const uid = req.user.userId
    const uidTodo = await Todos.find({userId : uid});
    console.log(uidTodo)
    res.send(uidTodo)
})

app.delete("/todos/:id", auth, async function(req, res){
    const id = req.params.id;
    const userId = req.user._id;

    const todo = Todos.findOne({id});
    if(todo.userId != userId) {
        res.send(400).json({
            message: "You are not authorized to delete this todo"
        })
        return;
    }

    await Todos.findByIdAndDelete(id);
        
    res.status(202).json(
        {
            messages: `${id} deleted`
        }
    )

})


app.listen(3000, ()=>{
    connectDB();
})