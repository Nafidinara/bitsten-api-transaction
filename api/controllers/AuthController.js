const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const database = require('../../config/database');
const { networkInterfaces } = require('os');

const UserController = () => {
  const UserIP = () => {
    const nets = networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object
    let ip = 'localhost';

    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
        }
      }
    }
    if (results.ens4){
      ip = results.ens4[0];
    }

    return ip;
  }

  const register = async (req, res) => {
    const { body } = req;

    if (body.password === body.c_password) {
      try {
        const user = await User.create({
          email: body.email,
          password: body.password,
          ip_address: UserIP()
        });
        const token = authService().issue({ id: user.id });

        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const user = await User
            .findOne({
              where: {
                email,
              },
            });
        
        if (!user) {
          return res.status(400).json({ status : false,
            message : 'Bad Request: User not found' });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });
          var m = {};
          try {
             m = await database.query(`insert into users_token (userid,token)  values("${user.id}","${token}")`, {
            //type: QueryTypes.SELECT,
            //raw:true 
          });
        }
        catch (err) {
          console.log(err);
         
        }

          return res.status(200).json({ 
            status : true,
    message : "ok",
    data:{token:token}
          });
        }

        return res.status(401).json({ status : false,
          message : 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ status : false,
          message : 'Internal server error' });
      }
    }

    return res.status(400).json({ status : false,
      message :'Bad Request: Email or password is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status : false,
        message : 'Internal server error' });
    }
  };

  return {
    register,
    login,
    validate,
    getAll,
  };
};

module.exports = UserController;
