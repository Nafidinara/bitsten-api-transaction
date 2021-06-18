const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user).hash; // eslint-disable-line no-param-reassign
    user.salt = bcryptService().password(user).salt; // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  ip_address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  real_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  activation_code: {
    type: Sequelize.STRING,
    allowNull: true
  },
  forgotten_password_code: {
    type: Sequelize.STRING,
    allowNull: true
  },
  remember_code: {
    type: Sequelize.STRING,
    allowNull: true
  },
  created_on: {
    type: Sequelize.STRING,
    allowNull: true
  },
  last_login: {
    type: Sequelize.STRING,
    allowNull: true
  },
  active: {
    type: Sequelize.STRING,
    allowNull: true
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  company: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true
  },
  upline: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  token: {
    type: Sequelize.STRING,
    allowNull: true
  },
}, { hooks, tableName,timestamps :false });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = User;
