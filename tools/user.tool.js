const db = require('../dataBase/dataBase');


const getUsers = async (userId = 0) => {
    const {userNextId, usersData} = await db.readData();

    if (!userId) {
        return usersData;
    }

    const userObj = usersData.find(item => item.id === Number(userId));

    if (!userObj) {
        return `Not exists user - id: ${userId}`;
    }

    return {...usersData.find(item => item.id === Number(userId))};
};

const insertUser = async (userData) => {
    const {userNextId, usersData} = await db.readData();

    db.writeData(userNextId + 1, [...usersData, {id: userNextId, ...userData}]);

    return {id: userNextId, ...userData};
};

const updateUser = async (userId, userData) => {
    const {userNextId, usersData} = await db.readData();

    const userIndex = usersData.findIndex(item => item.id === Number(userId));

    if (userIndex === -1) {
        return `Not find user - id: ${userId}`;
    }

    usersData[userIndex] = {...userData, id: usersData[userIndex].id};

    db.writeData(userNextId, usersData);

    return {...usersData[userIndex]};
};

const deleteUser = async (userId) => {
    const {userNextId, usersData} = await db.readData();

    const userIndex = usersData.findIndex(item => item.id === Number(userId));

    if (userIndex === -1) {
        return `Not find user - id: ${userId}`;
    }

    db.writeData(userNextId, usersData.filter((item, index) => index !== userIndex));

    return `Deleted user - id: ${userId}`;
};


module.exports = {
    getUsers,
    insertUser,
    updateUser,
    deleteUser
};