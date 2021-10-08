const express = require('express');
const mongoose = require('mongoose');

const {APP_PORT, MONGO_CONNECT_URL} = require('./configs/config');

const userRouter = require('./routers/user.router');
const authRouter = require('./routers/auth.router');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(APP_PORT, 'localhost', () => {
    console.log(`App listens port: ${APP_PORT}`);
});
