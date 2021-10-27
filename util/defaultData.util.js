const {userStatuses, userRoles} = require('../constants');
const {User} = require('../models');

module.exports = async () => {
    const admin = User.findOne({role: userRoles.ADMIN});

    if (!admin) {
        await User.createUserWithHashPassword({
            name: 'Yura',
            secondName: '',
            age: 0,
            status: userStatuses.ACTIVE,
            email: 'some_email@mail.com',
            password: 'My_PassWord!20',
            role: userRoles.ADMIN
        });
    }
};
