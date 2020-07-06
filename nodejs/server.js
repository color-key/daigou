const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const request = require('request');
const fs = require('fs');
const path = require('path');
const {addUser, getUserByOpenid, login, updUser, getUser, updUserStatus, updUserAddress} = require('./user');
const manager = require('./manager');
const {auth} = require('./auth');

const app = new Koa();
// app.use(bodyParser());
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024,    // 设置上传文件大小最大限制，默认2M
    multipart:true
  }
}));

router.post('/login', async (ctx, next) => {
  const code = ctx.request.body.code;
  const userInfo = ctx.request.body.userInfo;
  const res = await login({code, userInfo});
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/user/add', async (ctx, next) => {
  const nickName = ctx.request.body.nickName;
  const avatarUrl = ctx.request.body.avatarUrl;
  const gender = ctx.request.body.gender;
  const country = ctx.request.body.country;
  const province = ctx.request.body.province;
  const city = ctx.request.body.city;
  const language = ctx.request.body.language;
  const openid = ctx.request.body.openid;
  const res = await addUser({nickName, avatarUrl, gender, country, province, city, language, openid});
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/user/upd', async (ctx, next) => {
  const res = await updUser(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/user/updStatus', async (ctx, next) => {
  const res = await updUserStatus(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/user/updAddress', async (ctx, next) => {
  const res = await updUserAddress(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/user/getByOpenid/:openid', async (ctx, next) => {
  const { openid } = ctx.params
  const res = await getUserByOpenid(openid);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/user/find', async (ctx, next) => {
  const authed = await auth(ctx);
  if(authed){
    const res = await getUser(ctx);
    ctx.response.type = 'application/json';
    ctx.response.body = res;
  }else{
    ctx.response.status = 401;
  }
});

router.post('/manager/login', async (ctx, next) => {
  const res = await manager.login(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/manager/updPassword', async (ctx, next) => {
  const res = await manager.updPassword(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/manager/find', async (ctx, next) => {
  const authed = await auth(ctx);
  if(authed){
    const res = await manager.findManager(ctx);
    ctx.response.type = 'application/json';
    ctx.response.body = res;
  }else{
    ctx.response.status = 401;
  }
});

router.post('/manager/add', async (ctx, next) => {
  const res = await manager.addManager(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

app.use(router.routes());
app.listen(3000);
console.log('app started at port 3000...');