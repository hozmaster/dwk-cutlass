const axios = require("axios");
const service_url = process.env.TODO_URL_ADDRESS;

const getAllTodos = async () => {
    const res = await axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        url: service_url + '/todos',
    }).catch(error => {
        console.log(error);
    });
    let data = '[]';
    if (res && res.data !== undefined) {
        data = res.data;
    }
    return JSON.parse(data);
}

module.exports = {getAllTodos}