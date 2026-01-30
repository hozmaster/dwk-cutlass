const express = require('express');
const router = require('express').Router();
const {insertTodo, getAllTodos} = require("../library/todo");


// Listen incoming post request
router.get ('/', async (req, res) => {
    res.status(200).send(``);
});

// Listen incoming post request
router.post('/todos',  express.json(), async (req, res) => {
    if (req.body && req.body.todo) {
        const todo = req.body.todo;
        let statusCode = 200;
        if (todo.length > 0 && todo.length < 141) {
            await insertTodo(req.body.todo);
            console.log("backend: Added.");
        } else  {
            console.log("backend: Too big or nothing sent as a action. Please try again.");
            statusCode = 422;
        }
        res.status(statusCode).send({"status:": statusCode});
    } else {
        console.log("backend: Nothing entered to service. Quit.")
        res.status(400).send({"status":"error"});
    }
});

router.get('/todos', async (req, res) => {
    const todo = await getAllTodos();
    res.json(JSON.stringify(todo));
});

module.exports = router;