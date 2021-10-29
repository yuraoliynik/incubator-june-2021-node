const cron = require('node-cron');

const cronFunction = require('./cronFunction');

module.exports = () => {
    cron.schedule('0 03 * * *', () => {
        cronFunction.deleteOldActionTokens();
    });

    cron.schedule('0 04 * * *', () => {
        cronFunction.deleteOldRefreshTokens();
    });

    cron.schedule('0 05 * * *', () => {
        cronFunction.wakeUpUsers();
    });
};
