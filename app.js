const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRouter = require('./routers/user.router');
app.use('/users', userRouter);

app.listen(5000, () => {
    console.log('App listens 5000');
});
