const UserApiKey = require('./../models/UserApiKey');

module.exports = async (req, res, next) => {
  try {
    let params = req.query;
    const user = await UserApiKey.findOne({
      where: {
        user: params.userapi,
        api_key: params.apikey
      }
    });

    if(user){
      req.user = user;
      return next()
    }else{
      return res.status(401).json({ msg: 'No Authorization was found' });
    }

  }catch(err){
    return res.status(500).json({
      status : false,
      message: 'Internal server error, please provide the parameters',
      error: err
    });
  }
};
