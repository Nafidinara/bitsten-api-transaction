const Sequelize = require('sequelize');
const db = require('../../config/database');

const tableName = 'email_code';

const hooks = {
    afterFind: function(result) {

    },
    beforeFind: function(result) {

    }
}

const EmailCode = db.define('email_code', {
    userid:{
        type: Sequelize.BIGINT
    },
    date:{
        type: Sequelize.STRING
    },
    statuse:{
        type: Sequelize.INTEGER
    },
    lastsend:{
        type: Sequelize.STRING
    },
    data:{
        type: Sequelize.JSON
    },
    email:{
        type: Sequelize.STRING
    },
    code:{
        type: Sequelize.STRING
    }
}, {hooks,tableName,timestamps:false});

module.exports = EmailCode;
