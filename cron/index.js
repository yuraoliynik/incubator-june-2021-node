const cron = require('node-cron');

const cronFunction = require('./cronFunction');

module.exports = () => {
    cron.schedule('0 03 * * *', () => {
        cronFunction.deleteOldActionTokens();
        cronFunction.deleteOldRefreshTokens();
    });
};
