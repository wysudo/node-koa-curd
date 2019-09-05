import defaults from './config.default';
import dev from './config.dev';
import prod from './config.prod';

let cfg;
switch(defaults.env) {
	case 'dev':
		cfg = Object.assign({}, defaults, dev);
		break;
	default:
		cfg = Object.assign({}, defaults, prod);
		break;
}

module.exports = { ...cfg };
