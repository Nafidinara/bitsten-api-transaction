const Sequelize = require('sequelize');
const db = require('../../config/database');

const tableName = 'all_coin';

const hooks = {
    afterFind: function(result) {
        if(result.constructor === Array) {
            for (let i = 0; i < result.length; i++) {
                result[i].disabled = result[i].kondition >= 4;
                result[i].delisted = result[i].kondition === 5;
            }
        } else {
            result.disabled = result.kondition >= 4;
            result.delisted = result.kondition === 5;
        }
        return result;
    },
    beforeFind: function(result) {
        Object.assign(result,{where: {
                kondition: {
                    [Sequelize.Op.not]: 5
                }
            }});
        // console.log(`cek isi result : ${JSON.stringify(result)}`);
        return result;
    }
}

const Asset = db.define('Asset', {
    name:{
        type: Sequelize.STRING
    },
    feewd:{
        type: Sequelize.STRING
    },
    confirm:{
        type: Sequelize.STRING
    },
    minwd:{
        type: Sequelize.STRING
    },
    maxwd2:{
        type: Sequelize.STRING
    },
    kondition:{
        type: Sequelize.STRING
    },
    fee_eth:{
        type: Sequelize.STRING
    },
    code:{
        type: Sequelize.STRING
    },
    disabled : Sequelize.VIRTUAL,
    delisted : Sequelize.VIRTUAL,
}, {hooks,tableName,timestamps:false});

module.exports = Asset;