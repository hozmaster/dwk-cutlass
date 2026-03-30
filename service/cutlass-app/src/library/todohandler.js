const axios = require("axios");
const service_url = process.env.TODO_URL_ADDRESS || 'http://localhost:3010';

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

    let rawData = [];
    if (res && res.data !== undefined) {
        rawData = JSON.parse(res.data);
    }

    const doneTodos = rawData.filter((todo) => {
        return todo.done === true;
    });

    const pendingTodos = rawData.filter((todo) => {
        return todo.done !== true;
    });

    return {
        done: doneTodos,
        pending: pendingTodos
    };
}

const checkBackendHealthy = async () => {
    let isBackendOk = -1;
    try {
        const res = await axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: service_url + '/healthz',
        });
        isBackendOk = res.status === 200;
    } catch (e) {
        console.log(e);
    }
    return isBackendOk;
}

module.exports = {getAllTodos, checkBackendHealthy}