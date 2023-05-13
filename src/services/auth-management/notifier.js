// services/auth-management/notifier.js
module.exports = (app) => {
    function getLink(type, hash) {
      return "http://localhost:3030/" + type + "?token=" + hash;
    }
  
    async function sendSMS(number) {
      try {
        console.log(`Sending SMS to ${number}`)
      } catch (err) {
        console.error(err);
      }
    }
  
    return (type, user, notifierOptions = {}) => {
      if (type === "resendVerifySignup") {
        console.log(`Sending SMS with OTP ${user.verifyShortToken}`);
        return sendSMS(user.cellphone);
      } else if (type === "verifySignup") {
        return sendSMS(user.cellphone);
      }
    };
  };
  