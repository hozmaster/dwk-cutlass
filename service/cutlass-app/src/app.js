const express = require('express');
const app = express();
const path = require('path');
const {getAllTodos, checkBackendHealthy} = require('./library/todohandler');
const {isImageOldEnough, base64Encode, fetchImageFile} = require("./library/image");

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res, next) => {
    console.log('GET /');
    try {
        const todos = await getAllTodos();
        let base64Image = base64Encode() ?? null;
        res.render('home', {
            ipsumImage: base64Image, todos: todos
        });

        res.on('finish', async () => {
            console.log('finish ')
            const tooOld = isImageOldEnough();
            if (tooOld) {
                await fetchImageFile();
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).render('error', {message: 'Something went wrong'});
    }
});

app.get('/healthz', async (req, res) => {
    console.log("healthz");
    let statusCode = 200;
    const ifOk = await checkBackendHealthy();
    if (!ifOk) {
        statusCode = 503;
    }
    res.sendStatus(statusCode);
})

module.exports = app;