//compose模块可以将多个中间件函数合并成一个大的中间件函数，然后调用这个中间件函数就可以依次执行添加的中间件函数，执行一系列的任务。
const compose = require('koa-compose');
const glob = require('glob');  //允许你使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件
const { resolve } = require('path'); //resolve方法会把一个路径或路径片段的序列解析为一个绝对路径。

const registerRouter = function(){
  let routers = [];
  glob.sync(resolve(__dirname, './src/controller', '**/*.js'))//同步 得到地址数组；__dirname  == E:\WorkSpace\node.js\koa\koa4 
	  .filter(value => (value.indexOf('index.js') === -1))//过滤掉首页；
	  .map(router => { //将所有的元素添加到路由
		console.log(router,"=======registerRouter");    //   E:/WorkSpace/node.js/koa/koa4/src/controller/userController.js ======== registerRouter   
		routers.push(require(router).routes());
		routers.push(require(router).allowedMethods());
	  })
  return compose(routers);//获得中间件函数集合
};
module.exports = registerRouter;