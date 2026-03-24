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
        console.log('Fetching todos failed : ');
        console.log(error);
    });
    let data = '[]';
    if (res && res.data !== undefined) {
        data = res.data;
    }
    return JSON.parse(data);
}

const getTodoCount = async () => {
    const res = await axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        url: service_url + '/todos/count',
    }).catch(error => {
        console.log("Reason:" + error);
        return -1;
    });
    return JSON.parse(res.count);
}

module.exports = {getAllTodos, getTodoCount}