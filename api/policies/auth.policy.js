const JWTService = require('../services/auth.service');
// const bycrypt = require('../services/bcrypt.service')
const User = require('./../models/User');
const UserToken = require('./../models/UserToken');


 

// usually: "Authorization: Bearer [token]" or "token: [token]"
module.exports = async (req, res, next) => {
  let tokenToVerify;
  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');


 
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
        
      } else {
        return res.status(401).json({success:false, message: 'Format for Authorization: Bearer [token]' });
      }
    } else {
      return res.status(401).json({ success:false, message: 'Format for Authorization: Bearer [token]' });
    }
  }
  /* else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ success:false, message:'No Authorization was found' });
  }
  */

 
  let compare = JWTService().decrypt(tokenToVerify);

  

  let userToken = await UserToken.findOne({
    where: {
      token : compare
    }
  });

  

  if (userToken){
    req.user = await User.findByPk(userToken.userid);
    if (req.user){
      req.token = compare;
      return next();
    }
    return res.status(401).json({ success:false, message:'Invalid Authorization Token' });
  } 

  return res.status(401).json({ success:false, message: 'Invalid Authorization Token' });

  // return JWTService().verify(tokenToVerify, async (err, thisToken) => {
  //   if (err) return res.status(401).json({ err });
  //   req.user = await User.findByPk(thisToken.id);
  //   req.token = thisToken;
  //   return next();
  // });
};
