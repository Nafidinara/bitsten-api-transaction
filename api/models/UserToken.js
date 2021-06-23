const Sequelize = require('sequelize');
const db = require('../../config/database');

const tableName = 'users_token';

const hooks = {
    afterFind: function(result) {

    },
    beforeFind: function(result) {

    }
}

const UserToken = db.define('users_token', {
    userid:{
        type: Sequelize.BIGINT
    },
    date:{
        type: Sequelize.STRING
    },
    token:{
        type: Sequelize.STRING
    }
}, {hooks,tableName,timestamps:false});

module.exports = UserToken;
