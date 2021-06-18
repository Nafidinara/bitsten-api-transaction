const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  ip_address: {
    type: Sequelize.STRING,
  },
  real_name: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  activation_code: {
    type: Sequelize.STRING,
  },
  forgotten_password_code: {
    type: Sequelize.STRING,
  },
  remember_code: {
    type: Sequelize.STRING,
  },
  created_on: {
    type: Sequelize.STRING,
  },
  last_login: {
    type: Sequelize.STRING,
  },
  active: {
    type: Sequelize.STRING,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  active: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  company: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  upline: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  token: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName,timestamps:false });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = User;
