const {userRoles, userStatuses} = require('../constants');
const {User} = require('../models');

module.exports = async () => {
    const user = await User.findOne({role: userRoles.ADMIN});

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'Yura',
            secondName: '',
            age: 0,
            status: userStatuses.ACTIVE,
            email: 'yuraoliynyk.20@gmail.com',
            password: 'My_PassWord!20',
            role: userRoles.ADMIN
        });
    }
};
