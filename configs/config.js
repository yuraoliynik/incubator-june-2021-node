module.exports = {
    APP_PORT: process.env.APP_PORT || 5000,
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',
    SECRET_WORD_ACCESS: 'secret_word_access',
    SECRET_WORD_REFRESH: 'secret_word_refresh',
    ACCESS: 'access',
    REFRESH: 'refresh'
};
