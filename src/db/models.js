import { Knex } from './index';

Knex.schema.__proto__._createTableIfNotExists = function(tableName, callback){
	Knex.schema.hasTable(tableName).then(exists => {
		if(exists) { return console.log(`表[${tableName}]已经存在!`); }
		Knex.schema.createTableIfNotExists(tableName, callback).then(() => {
			console.log(`${tableName} ddl upgrade.`);
		});
	});
	return this;
};

const up_authority = function() {
	Knex.schema
		._createTableIfNotExists('device2', (table) => {
			table.timestamp('timestamp').comment('时间戳');
            table.string('deviceid', 20).comment('设备id');
			table.string('datapoint', 100).comment('数据点');
            table.double('value').comment('值');
		})
		._createTableIfNotExists('viz_dashboard_d', (table) => {
			table.increments('id').primary();
			table.string('device_id', 50).comment('设备id');
			table.string('device_name',50).comment('设备名称');
			table.json('charts').comment('图表');
			table.integer('orderby').comment('排序');
			table.timestamp('created_at').defaultTo(Knex.fn.now()).comment('创建时间');
			table.timestamp('updated_at').defaultTo(Knex.fn.now()).comment('最后更新时间');
		});
};

const up_user = function() {
	Knex.schema
		._createTableIfNotExists('t_user', (table) => {
			table.increments('id').primary();
			table.string('username', 255).comment('用户名');
			table.string('password', 255).comment('用户密码');
			table.string('tel', 255).comment('用户电话');
			table.string('addr', 255).comment('用户地址');
			table.timestamp('created_at').defaultTo(Knex.fn.now()).comment('创建时间');
			table.timestamp('updated_at').defaultTo(Knex.fn.now()).comment('最后更新时间');
		});
};

export const models = {
	up_authority,
	up_user
};

/**
 * 同步/更新数据库结构
 *
 * @export
 */
export function ddl_up() {
	let ups = [];
	for(let key in models) {
		ups.push(models[key]);
		console.log(`发现model: ${key}`);
	}
	console.log(`共发现${ups.length}个model。`);
	console.log('开始更新数据库结构...');
	ups.forEach(up => {
		up();
	});

}