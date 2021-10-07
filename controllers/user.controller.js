const userTool = require('../tools/user.tool');

module.exports = {
    getUsers: async (req, res) => {
        res.json(await userTool.getUsers());
    },

    getUserById: async (req, res) => {
        res.json(await userTool.getUsers(req.params.userId));
    },

    createUser: async (req, res) => {
        res.json(await userTool.insertUser(req.body));
    },

    updateUser: async (req, res) => {
        res.json(await userTool.updateUser(req.params.userId, req.body));
    },

    deleteUser: async (req, res) => {
        res.json(await userTool.deleteUser(req.params.userId));
    }
};