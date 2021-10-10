module.exports = {
    login: (req, res) => {
        try {
            res.json('OK!!!!!');
        } catch (err) {
            res.json(err.message);
        }
    }
};
