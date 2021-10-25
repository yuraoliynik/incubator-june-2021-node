const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const {ActionToken, Oauth} = require('../models');

dayJs.extend(utc);

module.exports = {
    async deleteOldActionTokens() {
        const previousDay = dayJs.utc().subtract(1, 'day');

        const deleteInfo = await ActionToken.deleteMany({
            createdAt: {$lt: previousDay}
        });

        console.log('Info about deleting old action tokens:', deleteInfo);
    },

    async deleteOldRefreshTokens() {
        const previousMonth = dayJs.utc().subtract(1, 'month');

        const deleteInfo = await Oauth.deleteMany({
            createdAt: {$lt: previousMonth}
        });

        console.log('Info about deleting old refresh tokens:', deleteInfo);
    }
};
