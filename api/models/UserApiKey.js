const Sequelize = require('sequelize');
const db = require('../../config/database');

const tableName = 'api_key';

const hooks = {
    afterFind: function(result) {

    },
    beforeFind: function(result) {

    }
}

const UserApiKey = db.define('UserApiKey', {
    api_key:{
        type: Sequelize.STRING
    },
    user:{
        type: Sequelize.STRING
    },
    statuse:{
        type: Sequelize.DOUBLE
    },
    nonce:{
        type: Sequelize.DOUBLE
    },
    userid:{
        type: Sequelize.BIGINT
    }
}, {hooks,tableName,timestamps:false});

module.exports = UserApiKey;