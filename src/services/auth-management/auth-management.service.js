const {
    VerifySignupShortService,
    AuthenticationManagementService,
} = require("feathers-authentication-management");

const notifier = require("./notifier");



module.exports = function (app) {
    const options = {
        app, // <- this one is required. The following are optional
        notifier: notifier(app),
        longTokenLen: 15, // token's length will be twice this
        shortTokenLen: 6,
        shortTokenDigits: true,
        resetDelay: 1000 * 60 * 60 * 2, // 2 hours
        delay: 1000 * 60 * 60 * 24 * 5, // 5 days
        resetAttempts: 5,
        reuseResetToken: false,
        identifyUserProps: ['cellphone'],
        skipIsVerifiedCheck: false,
        passwordField: 'password'
      };
    app.use('/auth-management', new AuthenticationManagementService(app,options));
    app.use("auth-management/verify-signup-short", new VerifySignupShortService(app,options));

};