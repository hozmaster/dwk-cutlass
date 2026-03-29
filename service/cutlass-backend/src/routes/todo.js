const express = require('express');
const router = require('express').Router();
const {insertTodo, getAllTodos, getTodoCount, checkIsTableExists, markTodoAsDone} = require("../library/todo");
const {isNumeric} = require("../library/scripts");

router.get('/', async (req, res) => {
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

router.put('/todos/:id', async (req, resp) => {
    console.log('put /todo/:id');
    let statusCode = 404;
    const todoId = req.params.id;
    if (isNumeric(todoId)) {
        const isPassed = await markTodoAsDone(todoId);
        if (isPassed) {
            statusCode = 200;
        }
    }
    resp.sendStatus(statusCode);
})

router.get('/healthz', async (req, res) => {
    console.log('get /healthz');
    try {
        const exists = await checkIsTableExists();
        if (exists) {
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