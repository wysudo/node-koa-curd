import {User} from '../model';

export const UserService = {
    async findAllUser(page,pageSize){
        const options={page:page,pageSize:pageSize};
        const result = await User.forge()
        .orderBy('created_at', 'desc')
        .fetchPage(options);
        return { data: result, pagination: result.pagination };
    },

    async findById(user_id){
        return await User.forge({id:user_id}).fetch();
    },

    async add(vo){
        return await User.forge(vo,{
            hasTimestamps: true
        }).save(null,{method: 'insert'});
    },

    async update(vo){
        return await User.forge(vo,{
            hasTimestamps: true
        }).save(null,{});
    },

    async delete(id){
        return await User.forge({
            id: id
        }).destroy();
    }
};