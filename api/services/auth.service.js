const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
require("dotenv").config();


const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';
const authService = () => {
  const issue = (payload) => jwt.sign(payload, secret, { expiresIn: 10800 });
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

  const encrypt = (token) => {
    return CryptoJS.AES.encrypt(token, process.env.SECRET_PASS).toString();
  }
  const encryptMd5 = (token) => {
    return CryptoJS.MD5(token + process.env.SECRET_PASS).toString();
  }
  const decrypt = (token) => {
    return CryptoJS.AES.decrypt(token, process.env.SECRET_PASS).toString(CryptoJS.enc.Utf8);
  }
  return {
    issue,
    verify,
    encrypt,
    decrypt,
    encryptMd5
  };
};

module.exports = authService;
