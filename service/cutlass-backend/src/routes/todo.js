const express = require('express');
const router = require('express').Router();
const {insertTodo, getAllTodos, getTodoCount} = require("../library/todo");


// Listen incoming post request
router.get('/', async (req, res) => {
    console.log('get /');
    res.status(200).send();
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
        } else {
            statusText = 'backend: Too big or nothing sent as a action. Please try again.'
            statusCode = 422;
        }
        statusText = 'Inserted';
    } else {
        statusText = 'Invalid input data';
        statusCode = 400;
    }
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

router.get('/healthz', async (req, res) => {
    console.log('get /healthz');
    try {
        const todos = await getAllTodos();
        if (todos) {
            res.sendStatus(200);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(503);
    }
});

router.get('/todos/count', async (req, res) => {
    console.log('get /todos/count');
    let count = -1;
    try {
        count = await getTodoCount();
    } catch (e) {
        console.error(e);
        res.sendStatus(503);
    }
    res.json(JSON.stringify({"count": count}));
})

module.exports = router;