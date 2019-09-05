import knex from 'knex';
import bookshelf from 'bookshelf';
import jsonColumns from 'bookshelf-json-columns';
import defaultSelect from 'bookshelf-default-select';
import mask from 'bookshelf-mask';
import moment from 'moment';
import { dbconn, dbtype } from '../config';

const Knex = knex({
    client: dbtype,
    connection: dbconn
});

const Bookshelf = bookshelf(Knex);
Bookshelf.plugin('visibility'); //
Bookshelf.plugin('pagination'); //开启分页
Bookshelf.plugin(jsonColumns);
Bookshelf.plugin(mask);

Bookshelf.plugin(defaultSelect({relation: false}));

// 覆盖Bookshelf.Model的toJSON方法
const BaseModel = Bookshelf.Model.extend({
    toJSON: function(){
        let attrs = Bookshelf.Model.prototype.toJSON.apply(this, arguments);
        if(this.constructor.dateColumns){
            this.constructor.dateColumns.forEach(column => {
                if(this.get(column)) {
					attrs[column] = this.get(column) === "0000-00-00 00:00:00" ? null : moment(this.get(column)).format('YYYY-MM-DD HH:mm:ss');
				}
            });
        }
        const defaultDateColumns = ['updated_at', 'created_at']
		defaultDateColumns.forEach(column => {
			if(this.get(column)) {
				attrs[column] = this.get(column) === "0000-00-00 00:00:00" ? null : moment(this.get(column)).format('YYYY-MM-DD HH:mm:ss');
			}
		});
        return attrs;
    }
});

export {
    Knex, Bookshelf, BaseModel
};