const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const uuid = require("uuid");
const cors = require("cors");


app.use(bodyParser.json());
app.use(cors());

const todos = [
    {
        id: 1,
        desc: "Write Python code",
        completed: false,
    },
    {
        id: 2,
        desc: "Write Javascript code",
        completed: true,
    },
];

// Home route
app.get("/", (req, res, next) => {
    res.send("<h3>Todo list homepage</h3>");
});

// Get all todos
app.get("/todos", (req, res) => {
    res.json(todos);
});

// Get a single todo by ID
app.get("/todos/:id", (req, res) => {
    let todo = todos.find((todo) => todo.id == req.params.id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send("Todo not found");
    }
});

// Add a new todo
app.post("/todos", (req, res) => {
    let body = req.body;
    todos.push({ id: uuid.v4(), ...body });
    res.json(todos);
});

// Update an existing todo
app.put("/todos/:id", (req, res) => {
    let todo = todos.find((todo) => todo.id == req.params.id);
    if (todo) {
        todo.desc = req.body.desc;
        todo.completed = req.body.completed;
        res.json(todos); // Return updated todos
    } else {
        res.status(404).send("Todo with given id doesn't exist");
    }
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
    let index = todos.findIndex((todo) => todo.id == req.params.id);
    if (index !== -1) {
        todos.splice(index, 1); // Remove the todo
        res.json(todos); // Return updated todos after deletion
    } else {
        res.status(404).send("Todo not found");
    }
});

// Start the server
app.listen(port, () => {
    console.log("App is listening on port:", port);
});
