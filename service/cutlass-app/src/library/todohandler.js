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