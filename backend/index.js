import express from "express"
import jwt from "jsonwebtoken"
import auth from "./middleware/auth.js"
import dotenv from "dotenv"

// const token = jwt.sign()

const app = express();
app.use(express.json())
app.use(express.static("../frontend"))
dotenv.config()

let todos = []
let todoId = 1

let users = []
let userId = 1


app.get("/", function home(req, res){
    res.sendFile("A:\\FULL STACK Web Development MERN\\Project\\2026\\Todo\\frontend\\login.html");
})

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    users.map(user=>{
        if(user.username==username && user.password==password){

            const token = jwt.sign(
                { userId : user.userId },   // payload
                process.env.SECRET_KEY,           // secret key
                { expiresIn: "1h" }
            );
            res.status(200).json({
                message:"Login Successful",
                token
            })
        }
    })

    res.status(400).json({
        message:"User Not Found"
    })
})

app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        res.status(400).json({
            message:"please fill the details"
        })

        return;
    }

    users.map(user=>{
        if(user.username==username){
            res.status(200).json({
                message:"UserName Already Exists"
            })

            return;
        }
    })
    


    users.push({
        userId : userId++, username, password
    })

    res.status(200).json({
        message: `${username} successfull signup`
    })
})

app.post("/todos",auth,  function(req, res){
    let todo = req.body.todo; 
    todos.push({
        todo,
        todoId: todoId++,
        userId:req.user.userId
    });
    res.status(200).json({
        messages: todo
    })
})

app.get("/todos",auth,  function(req, res){
    const uid = req.user.userId
    const uidTodo = todos.filter(todo=> todo.userId==uid)

    res.send(uidTodo)
})

app.delete("/todos/:id", auth,  function(req, res){
    const id = req.params.id;

    todos = todos.filter(todo=> todo.todoId!=id)
    console.log(todos)
    
    res.status(202).json(
        {
            messages: `${id} deleted`
        }
    )

})


app.listen(3000)