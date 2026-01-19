const path = require('path');
const fs = require("node:fs");
const {get} = require("axios");

const applicationPath = '/usr/src/app';
const theImageFile = path.join(applicationPath, '/files/image.jpg');
const tenMinutesInMs = 10 * 60 * 1000;

const ipsum_service = process.env.IPSUM_PIC_SP_URL;
const isImageOldEnough  = () => {
    let isTooOld = false;
    try {
        const now = Date.now();
        const stats = fs.statSync(theImageFile);
        const lastUpdated = stats.mtimeMs;
        if (now - lastUpdated > tenMinutesInMs) {
            isTooOld = true;
        }
    } catch (error) {
    }
    return isTooOld;
}

const fetchImageFile = async () => {
    const response = await get(ipsum_service + '/200/300', {responseType: 'stream'})
    response.data.pipe(fs.createWriteStream(theImageFile));
}

const initSystem = async () => {
    try {
        if (!fs.existsSync(theImageFile)) {
            await fetchImageFile();
        }
    } catch (error) {
        console.log(error);
    }
}

const base64Encode = () => {
    const bitmap = fs.readFileSync(theImageFile);
    return new Buffer(bitmap).toString('base64');
}

module.exports = {isImageOldEnough, base64Encode, fetchImageFile, initSystem}