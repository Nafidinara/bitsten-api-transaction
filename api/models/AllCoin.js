const Sequelize = require('sequelize');
const db = require('../../config/database');
const { QueryTypes } = require('sequelize');
const database = require('../../config/database');

const tableName = 'all_coin';

const hooks = {
    afterFind: function(result) {
        if(result.constructor === Array) {
            for (let i = 0; i < result.length; i++) {
                result[i].balance = 'sdsdsd';
            }
        }
    },
    beforeFind: function(result) {
        Object.assign(result,{where: {
                kondition: {
                    [Sequelize.Op.lte]: 4
                }
            }});
        return result;
    }
}

const AllCoin = db.define('AllCoin', {
    code:{
        type: Sequelize.STRING
    },
    name:{
        type: Sequelize.STRING
    },
    kondition:{
        type: Sequelize.DOUBLE
    },
    balance : Sequelize.VIRTUAL
}, {hooks,tableName,timestamps:false});

module.exports = AllCoin;