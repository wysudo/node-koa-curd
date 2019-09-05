module.exports = {
    dbconn: process.env['IOT_WS_DBCONN'] || 'postgresql://postgres:wby321@localhost:5432/datasql',
	dbtype: process.env['IOT_WS_DBTYPE'] || 'pg',
};