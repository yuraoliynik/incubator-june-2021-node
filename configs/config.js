module.exports = {
    APP_PORT: process.env.APP_PORT || 5000,

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',

    JWT_SECRET_WORD_ACCESS: process.env.JWT_SECRET_WORD_ACCESS || 'secret_word_access',
    JWT_SECRET_WORD_ACTION: process.env.JWT_SECRET_WORD_ACTION || 'secret_word_action',
    JWT_SECRET_WORD_REFRESH: process.env.JWT_SECRET_WORD_REFRESH || 'secret_word_refresh',

    NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL,
    NO_REPLAY_EMAIL_PASS: process.env.NO_REPLAY_EMAIL_PASS
};
