const JWTService = require('../services/auth.service');
const EmailCode = require('./../models/EmailCode');

module.exports = async (req, res, next) => {
  let encryptCode, decryptCode, body, email,data;
  body = req.body;
  decryptCode = body.email_code.toString();

  if(!decryptCode){
    return res.status(401).json({ success:false, message:'Email Code Not Valid' });
  }else{

    encryptCode = JWTService().encryptMd5(decryptCode);

    console.log(`${encryptCode} | ${decryptCode}`);
    delete body.email_code;
    email = await EmailCode.findOne({
      where: {
        code : encryptCode,
        data : body,
        statuse : 0
      }
    });

    if (!email){
      return res.status(401).json({ success:false, message:'Email Code Not Valid' });
    }

    //update emailCode
    await email.update({
      statuse : 1
    });

    req.email = email;

    return next();
  }

};
