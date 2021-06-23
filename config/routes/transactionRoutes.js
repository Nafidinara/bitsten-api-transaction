 
const transactionRouter = {
  //'POST /user': 'AuthController.register',
  'POST /register': 'AuthController.register', // alias for POST /user
  'POST /login': 'AuthController.login',
  'POST /email/send/code' : 'EmailController.sendEmail',
  // 'POST /validate': 'UserController.validate',
  //'GET /tickers': 'MarketController.getAll',
  //'GET /orderbooks': 'MarketController.orderBook',
  //'GET /assets': 'AssetController.getAll',
  //'GET /charts': 'ChartController.getAll',
  //'GET /home/banner': 'HomeController.getBanner',
  //'GET /home/flashnews': 'HomeController.getNews',
  //'GET /home/news': 'HomeController.getBerita',
  //'GET /market' : 'MarketController.getMarket',
  //'GET /market/main' : 'MarketController.getMain',
};

module.exports = transactionRouter; 

  