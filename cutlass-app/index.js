const app = require('./src/app');
const {initSystem} = require("./src/library/image");
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    initSystem().then(() => {
            console.log("Server started in port " + PORT);
        }
    );
});
