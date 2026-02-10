const app = require('./src/app');
const PORT = process.env.BACKEND_PORT || 3010;

// start to listen incoming requests
app.listen(PORT, () => {
    console.log("the process started in port " + PORT);
});
