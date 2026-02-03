const app = require('./src/app');
const {initSystem} = require("./src/library/image");
const PORT = process.env.APP_PORT || 3000;

// Start listening incoming requests
app.listen(PORT, () => {
    initSystem().then(() => {
            console.log("Server started in port " + PORT);
        }
    );
});

