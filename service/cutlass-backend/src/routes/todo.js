const express = require('express');
const router = require('express').Router();
const {insertTodo, getAllTodos} = require("../library/todo");


// Listen incoming post request
router.get('/', async (req, res) => {
    console.log('get /');
    res.status(200).send(``);
});

// Listen incoming post request
router.post('/todos', express.json(), async (req, res) => {
    console.log('post /todos');
    let statusCode = 200;
    let statusText = '';
    if (req.body && req.body.todo) {
        const todo = req.body.todo;
        if (todo.length > 0 && todo.length < 141) {
            await insertTodo(req.body.todo);
            console.log("backend: A new todo has added.");
        } else {
            statusText = 'backend: Too big or nothing sent as a action. Please try again.'
            statusCode = 422;
        }
        statusText = 'Inserted';
    } else {
        statusText = 'Invalid input data';
        statusCode = 400;
    }
    console.log(statusCode + ' : ' + statusText);
    res.status(statusCode).send({"status": statusText});
});

router.get('/todos', async (req, res) => {
    console.log('get /todos');
    let result = [];
    try {
        result = await getAllTodos();
    } catch (e) {
        console.error(e);
    }
    res.json(JSON.stringify(result));
});

module.exports = router;