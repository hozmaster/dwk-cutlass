const express = require('express');
const router = require('express').Router();
const {insertTodo, getAllTodos} = require("../library/todo");


// Listen incoming post request
router.get('/', async (req, res) => {
    console.log(JSON.stringify({
        severity: "INFO",
        message: "todo: get, /",
        requestId: "cutlass-backend",
        code: 200
    }));
    res.status(200).send(``);
});

// Listen incoming post request
router.post('/todos', express.json(), async (req, res) => {
    let statusCode = 200;
    let statusText = '';
    if (req.body && req.body.todo) {
        const todo = req.body.todo;
        if (todo.length > 0 && todo.length < 141) {
            await insertTodo(req.body.todo);
            console.log("backend: A new todo has added.");
        } else {
            console.log("backend: Too big or nothing sent as a action. Please try again.");
            statusCode = 422;
        }
        console.log(JSON.stringify({
            severity: "INFO",
            message: "todo: post request: Inserted",
            requestId: "cutlass-backend",
            code: 200
        }));
        statusText = 'Inserted';
    } else {
        statusText = 'Invalid input data';
        console.log(JSON.stringify({
            severity: "ERROR",
            message: "TODO post failed: Invalid input data",
            requestId: "cutlass-backend",
            code: 400
        }));
        statusCode = 400;
    }
    res.status(statusCode).send({"status": statusText});
});

router.get('/todos', async (req, res) => {
    const todo = await getAllTodos();
    console.log(JSON.stringify({
        severity: "INFO",
        message: "todo: get, /todos",
        requestId: "cutlass-backend",
        code: 200
    }));
    res.json(JSON.stringify(todo));
});

module.exports = router;