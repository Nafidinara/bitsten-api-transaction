const { QueryTypes } = require('sequelize');
const database = require('../../config/database');
const AllCoin = require('./../models/AllCoin');

const TransactionController = () => {

  const withdraw = async (req,res) => {
    //todo :
    //   1. check coin
    //   2. check user balance
    //

      let coin, body, user, balance, token, maxWd, totalAmount,emailCode;

      body = req.body;
      user = req.user;
      emailCode = req.email;

      try {

          if (user.active === 0){
              return res.status(400).json({
                  status : false,
                  message :'Cannot withdraw!'
              });
          }

          coin = await AllCoin.findOne({
              where: {
                  code : body.code,
              }
          });

          if (!coin){
              return res.status(400).json({
                  status : false,
                  message :'Coin code not found!' });
          }

          balance = await database.query(`SELECT amount, hold, onorder FROM balance_${coin.code} WHERE userid = ${user.id} LIMIT 1`, {
              type: QueryTypes.SELECT,
              raw: true
          });

          if (!balance || balance.length <= 0 ){
              return res.status(400).json({
                  status : false,
                  message :'Not Found Balance!'
              });
          }

          if (user.active === 1){
              maxWd = coin.maxwd
          }else {
              maxWd = coin.maxwd2
          }

          totalAmount = body.amount + coin.feewd;

          if (balance[0].amount < totalAmount || totalAmount > maxWd ){
              return res.status(400).json({
                  status : false,
                  message :'Insufficient Balance or bigger than maximum withdrawal!'
              });
          }

          await database.query(` INSERT INTO balance_${coin.code}_wd (userid,addr,tx_id,amount,statuse,fee,tag,type,email_code) VALUES ( ${user.id}, '${body.addr}', 'NULL' , ${body.amount} , 2 , ${coin.feewd} ,'${body.tag}', '${body.type}', ${emailCode.id}) `, {
              type: QueryTypes.INSERT,
              raw: true
          });

          return res.status(200).json({
              status : true,
              message : 'Success request withdraw'
          });
      }catch (err) {
          return res.status(400).json({
              status : false,
              message :err
          });
      }
  }

  return {
     withdraw
  };
};


module.exports = TransactionController;
