const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const {
    NODE_ENV,
    APP_PORT,
    ALLOWED_ORIGIN,
    MONGO_CONNECT_URL
} = require('./configs/config');
const {errorMessages, errorStatuses} = require('./constants');
const startCron = require('./cron');
const ErrorHandler = require('./errors/ErrorHandler');
const {authRouter, userRouter} = require('./routers');
const swaggerJSON = require('./docs/swagger.json');
const insertDefaultData = require('./util/defaultData.util');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(helmet());
app.use(cors({origin: _configureCORS}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
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

    insertDefaultData();
    startCron();
});

function _configureCORS(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(
            new ErrorHandler(
                errorMessages.CORS_IS_NOT_ALLOWED,
                errorStatuses.code_403
            ),
            false
        );
    }

    return callback(null, true);
}
