const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {NO_REPLAY_EMAIL, NO_REPLAY_EMAIL_PASS} = require('../configs/config');
const {errorMessages, errorStatuses} = require('../constants');
const allTemplates = require('../email-templates');
const ErrorHandler = require('../errors/ErrorHandler');

const emailTemplates = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLAY_EMAIL,
        pass: NO_REPLAY_EMAIL_PASS
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(errorMessages.WRONG_TEMPLATE_NAME, errorStatuses.status_404);
    }

    const html = await emailTemplates.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No replay',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};

