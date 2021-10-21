const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const {APP_PORT, MONGO_CONNECT_URL} = require('./configs/config');
const {authRouter, userRouter} = require('./routers');
const {errorStatuses} = require('./constants');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || errorStatuses.code_500)
        .json({msg: err.message});
});

app.listen(APP_PORT, () => {
    console.log(`App listens ${APP_PORT}`);
});
