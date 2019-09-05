import { BaseModel } from '../db';

export class User extends BaseModel{
    get tableName(){
        return 't_user';
    }
    static dateColumns = [ 'created_at', 'updated_at' ];
}