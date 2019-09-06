import koa from 'koa';
const app = new koa();

//用于提高网站的安全性
import helmet from 'koa-helmet';
app.use(helmet());

//用于post、get等请求头的处理
import body from 'koa-body';
app.use(body({
    'multipart': true,
}));

let registerRouter=require('./registerRouter.js')();//路由注册；
app.use(registerRouter);

import { port } from './src/config';
const server = app.listen(port);
server.setTimeout(120000);
console.log('Listening to port ' + port);
