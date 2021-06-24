
const transactionRouter = {
  //'POST /user': 'AuthController.register',
  'POST /register': 'AuthController.register', // alias for POST /user
  'POST /login': 'AuthController.login',
  'POST /auth/email/request' : 'EmailController.sendEmail',
  'POST /auth/withdraw' : 'transactionController.withdraw',
};

module.exports = transactionRouter;

