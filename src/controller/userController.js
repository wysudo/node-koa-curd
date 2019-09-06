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

/**
 * 新增删除用户信息
 */
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
        let succ = await UserService.add(userVo);
        if(succ){
            ctx.response.body = "用户信息添加成功！";
        }else{
            ctx.response.body = "用户信息添加失败！";
        }
    }else{
        //update
        userVo.id = userModel.toJSON().id;
        let succ = await UserService.update(userVo);
        if(succ){
            ctx.response.body = "用户信息修改成功！";
        }else{
            ctx.response.body = "用户信息修改失败！";
        }
    }
});

/**
 * 根据id删除用户信息
 */
router.delete('/delUser/:id', async (ctx,next) => {
    let id = ctx.params.id;
    let userModel = await UserService.findById(id);
    if(userModel){
        let suc = await UserService.delete(id);
        if(suc){
            ctx.response.body = "用户删除成功！";
        }else{
            ctx.response.body = "用户删除失败！";
        }
    }else{
        ctx.response.body = "所删除用户不存在！";
    }
});

module.exports = router;