import program from 'commander';

import {ddl_up} from './models';

//延时方法
function delay(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms); // Wait ms then resolve.
	});
}

program
    .version('0.0.1')
    .command('db <cmd>')
    .action((cmd) => {
        switch(cmd){
            case 'init':
                ddl_up();
                //延时2秒自动退出程序
                delay(2000).then(process.exit);
				break;
        }
    });
program.parse(process.argv);