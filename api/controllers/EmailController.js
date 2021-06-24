const https = require('https');
const fs = require('fs');
const EmailCode = require('./../models/EmailCode');
const JWTService = require('../services/auth.service');

const EmailController = () => {

  function isJson(text) {
    try {
      JSON.parse(text);
      return true;
    } catch (e) {
      return false;
    }
  }

  const sendEmail = async (req, res) => {
    let body = req.body;
    let recipient, code, content, subject, user, data;
    user = req.user;


     
   
    try {

      if (!body.data){
        return res.status(400).json({
          status : false,
          message : 'data cannot empty, please fill the data'
        });
      }

      // if (isJson(body.data) === false){
      //   return res.status(400).json({
      //     status : false,
      //     message : 'please provide the data in JSON!'
      //   });
      // }

  
      //set the sending data
      recipient =  user.email;
       
      subject = 'Bitsten Verification Code';
      code = Math.floor(Math.random() * 999999).toString();
      
      //set the sending data
  let bodyMail = await fs.readFileSync('./email-template/index.html', 'utf8');
  bodyMail = bodyMail.replace('{code}', code);

  content = "{\"personalizations\": [{\"to\": [{\"email\": \""+recipient+"\"}]}],\"from\": {\"email\": \"support@bitsten.com\"},\"subject\": \""+subject+"\",\"content\": [{\"type\": \"text/html \", \"value\": \""+bodyMail+"\"}]}";


const options = {
  hostname: 'api.sendgrid.com',
  port: 443,
  path: '/v3/mail/send',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.TOKEN_EMAIL}`,
    'Content-Type': 'application/json',
    'Content-Length': content.length
  }
}

const req = https.request(options, res2 => {
  console.log(`statusCode: ${res2}`);
  code = JWTService().encrypt(code);
  
  EmailCode.destroy({
    where: {
        userid: user.id
    } });

  EmailCode.create({
    userid : user.id,
    code : code,
    statuse : 0,
    data : body.data,
    email : user.email
  });

  return res.status(200).json({
    status: true,
    message: `success send email to : ${user.email}`
  })
})

req.on('error', error => {
  //console.error(error)
  return res.status(400).json({
    status : false,
    message : error,
  });
});

req.write(content)
req.end()

    } catch (err) {
      console.log(err);
      return res.status(500).json({
          status : false,
          message: 'Internal server error',
          error: err
      });
    }
  };

  return {
    sendEmail,
  };
};

module.exports = EmailController;
