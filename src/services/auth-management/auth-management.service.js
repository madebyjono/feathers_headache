const {
    VerifySignupShortService,
    AuthenticationManagementService,
} = require("feathers-authentication-management");

const notifier = require("./notifier");

module.exports = function (app) {
    app.use(
        "/auth-management",
        new AuthenticationManagementService(app, {
            notifier: notifier(app),
            resetAttempts: 5,
        })
    );
    app.use("auth-management/verify-signup-short", new VerifySignupShortService(app, {
        notifier: notifier(app),
        resetAttempts: 5,
    }));

};