const {emailActions} = require('../constants');

module.exports = {
    [emailActions.ACTIVATED_ACCOUNT]: {
        templateName: 'activated-account',
        subject: 'Activated'
    },

    [emailActions.CHANGE_PASSWORD]: {
        templateName: 'change-password',
        subject: 'Change password!!!'
    },

    [emailActions.DELETED_ACCOUNT]: {
        templateName: 'deleted-account',
        subject: 'Deleted'
    },

    [emailActions.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Forgot password!!!'
    },

    [emailActions.USER_DATA_WAS_UPDATED]: {
        templateName: 'user-data-was-updated',
        subject: 'Updated'
    },

    [emailActions.USER_IS_LOGGED_IN]: {
        templateName: 'user-is-logged-in',
        subject: 'Logged in'
    },

    [emailActions.USER_WAKE]: {
        templateName: 'user-wake',
        subject: 'Wake up!!!'
    },

    [emailActions.USER_WAS_REGISTERED]: {
        templateName: 'user-was-registered',
        subject: 'Registered'
    }
};
