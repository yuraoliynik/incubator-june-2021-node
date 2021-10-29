const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const {ActionToken, Oauth} = require('../models');
const {emailActions} = require('../constants');
const {emailService} = require('../services');

dayJs.extend(utc);

module.exports = {
    async deleteOldActionTokens() {
        const previousOneDay = dayJs.utc().subtract(1, 'day');

        const deleteInfo = await ActionToken.deleteMany({
            createdAt: {$lt: previousOneDay}
        });

        console.log('Info about deleting old action tokens:', deleteInfo);
    },

    async deleteOldRefreshTokens() {
        const previousOneMonth = dayJs.utc().subtract(1, 'month');

        const deleteInfo = await Oauth.deleteMany({
            createdAt: {$lt: previousOneMonth}
        });

        console.log('Info about deleting old refresh tokens:', deleteInfo);
    },

    async wakeUpUsers() {
        const previousTenDays = dayJs.utc().subtract(10, 'day');

        const usersForWake = await Oauth
            .find({
                $or: [
                    {createdAt: {$lt: previousTenDays}},
                    {updatedAt: {$lt: previousTenDays}}
                ]
            })
            .populate({path: 'user', options: {lean: true}})
            .lean();

        const promises = [];

        usersForWake.forEach((item, index) => {
            const {user: {name, email}} = item;

            promises[index] = emailService.sendMail(
                email,
                emailActions.USER_WAKE,
                {userName: name}
            );
        });

        const resultPromise = await Promise.allSettled(promises);

        const rejectedEmail = resultPromise.filter(({status}) => status === 'rejected').length;

        console.log(`***  Sending mail ${emailActions.USER_WAKE} completed.The number of rejected emails is ${rejectedEmail}`);
    }
};
