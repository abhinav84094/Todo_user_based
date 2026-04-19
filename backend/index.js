import express from "express"

const app = express();
app.use(express.json())

let todos = []
let todoId = 1


app.get("/", function home(req, res){
    res.sendFile("A:\\FULL STACK Web Development MERN\\Project\\2026\\Todo\\frontend\\home.html");
})

app.post("/todos", function(req, res){
    let todo = req.body.todo; 
    todos.push({
        todo,
        todoId: todoId++
    });
    res.status(200).json({
        messages: todo
    })
})

app.get("/todos", function(req, res){
    res.send(todos)
})

app.delete("/todos/:id", function(req, res){
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