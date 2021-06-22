const { QueryTypes } = require('sequelize');
const database = require('../../config/database');
const https = require('https');
const fs = require('fs');

const EmailController = () => {

  const sendEmail = async (req, res) => {
    const { email,id } = req.query; 
 

//console.log(email);
    try {


let header = "Bitsten Transaction Code";
let isi    = ""+ new Date();




  const dd = await fs.readFileSync('./email-template/index.html', 'utf8'); 
  //console.log(dd);
  isi = dd.replace('{code}',id);

  

const data = "{\"personalizations\": [{\"to\": [{\"email\": \""+email+"\"}]}],\"from\": {\"email\": \"support@bitsten.com\"},\"subject\": \""+header+"\",\"content\": [{\"type\": \"text/html \", \"value\": \""+isi+"\"}]}";

const options = {
  hostname: 'api.sendgrid.com',
  port: 443,
  path: '/v3/mail/send',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.TOKEN_EMAIL}`,
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res2 => {
  console.log(`statusCode: ${res2}`);
  return res.status(200).json({
    status : true,
    message : "success"
    
  });
  /*
  res.on('data', d => {
    process.stdout.write(d)
  })
  */
})

req.on('error', error => {
  //console.error(error)
  return res.status(200).json({
    status : false,
    message : error,
    
  });
})

req.write(data)
req.end()



/*
return res.status(200).json({
  status : false,
  message : "error",
  
});
*/
    

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

//EmailController.sendEmail();

module.exports = EmailController;
