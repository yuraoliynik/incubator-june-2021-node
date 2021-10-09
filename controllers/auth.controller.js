module.exports = {
    login: (req, res) => {
        try {
            res.json('Ok!!!!!');
        } catch (err) {
            res.json(err.message);
        }
    }
};
