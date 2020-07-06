const {query} = require('./mysql');
const {getQueryString} = require('./lib/query');
const moment = require('moment');

const mysqlTable = "monitored";

const add = async (ctx) => {
  const data = ctx.request.body;
  const sql = 'INSERT INTO '+mysqlTable+' SET ?';
  const args = data;
  const res = await query(sql, args);
  return res;
}

const findById = async (ctx) => {
  const id = getQueryString(ctx.request, 'id');
  const sql = 'SELECT * FROM '+mysqlTable+' WHERE `id` = ?';
  const args = [id];
  const res = await query(sql, args);
  if(res.success){
    res.result.map((item) => {
      item.createTime = moment(item.createTime).format('YYYY/MM/DD HH:mm');
    })
  }
  return res;
}

module.exports = {
  add,
  findById
}