const Sequelize = require('sequelize');
const db = require('../../config/database');
const { QueryTypes } = require('sequelize');
const database = require('../../config/database');

const tableName = 'all_coin';

const hooks = {
    beforeFind: function(result) {
        Object.assign(result.where,{
                kondition: {
                    [Sequelize.Op.lte]: 4
                }
            });
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
    feewd:{
        type: Sequelize.STRING
    },
    minwd:{
        type: Sequelize.STRING
    },
    maxwd:{
        type: Sequelize.STRING
    },
    maxwd2:{
        type: Sequelize.STRING
    },
    fee_eth:{
        type: Sequelize.STRING
    },
    kondition:{
        type: Sequelize.DOUBLE
    },
    jenis:{
        type: Sequelize.DOUBLE
    },
    balance : Sequelize.VIRTUAL
}, {hooks,tableName,timestamps:false});

module.exports = AllCoin;