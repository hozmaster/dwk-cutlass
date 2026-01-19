const express = require('express');
const app = express();
const path = require('path');
const {getAllTodos} = require('./library/todohandler');
const {isImageOldEnough, base64Encode, fetchImageFile} = require("./library/image");

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res, next) => {
    const todos = await getAllTodos();
    let base64Image = base64Encode();
    if (base64Image === undefined) {
        base64Image = null;
    }
    res.render('home', {ipsumImage: base64Image, todos: todos})
    next();
});

app.use('/', async (req, res, next) => {
    const tooOld = isImageOldEnough();
    if (tooOld) {
        await fetchImageFile();
    }
    next();
});

module.exports = app;