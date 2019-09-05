import Router from 'koa-router';
var router = new Router();
import { UserService } from '../service/userService';

/**
 * 分页查询用户列表
 * @param {number} page 页码
 * @param {number} size 条数
 */
router.post('/findAll', async (ctx) => {
    var data = ctx.request.body;
    var page  = data.page;
    var pageSize = data.pageSize;
    ctx.response.body = await UserService.findAllUser(page, pageSize);
});

router.post('/addUser', async (ctx,next) => {
    const data = ctx.request.body;
    let id = data.id;
    let userModel;
    if(id != null && id != undefined){
        userModel = await UserService.findById(id);
    }
    let userVo = {};
    userVo.username = data.username;
    userVo.password = data.password;
    userVo.tel = data.tel;
    userVo.addr = data.addr;
    if(!userModel){
        //insert
        await UserService.add(userVo);
    }else{
        //update
        userVo.id = userModel.toJSON().id;
        await UserService.update(userVo);
    }
});
module.exports = router;