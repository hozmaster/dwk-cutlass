const app = require('./src/app');
const {setupDatabase} = require("./src/db/database");
const PORT = process.env.BACKEND_PORT || 3010;

// start to listen incoming requests
app.listen(PORT, () => {
    setupDatabase().then(() => {
        console.log("The todo started in port " + PORT);
    });
});
