const User = require('../models/User');

module.exports = {
    getUsers: ({foundUsers}, res) => {
        try {
            res.json(foundUsers);

        } catch (err) {
            res.json(err.message);
        }
    },

    getUserById: ({foundUser}, res) => {
        try {
            res.json(foundUser);

        } catch (err) {
            res.json(err.message);
        }
    },

    createUser: async ({body}, res) => {
        try {
            const createdUser = await User.create(body);

            res.json(createdUser);

        } catch (err) {
            res.json(err.message);
        }
    },

    updateUser: async ({body, params: {userId}}, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                body,
                {new: true, runValidators: true}
            );

            res.json(updatedUser);

        } catch (err) {
            res.json(err.message);
        }
    },

    deleteUser: async ({params: {userId}}, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);

            res.json({'User was deleted': deletedUser});

        } catch (err) {
            res.json(err.message);
        }
    }
};
