const _db = require('ocore/db');
const sqlite3 = require('sqlite3');
const pathToDB = require('ocore/desktop_app.js').getAppDataDir() + '/byteball.sqlite';

const db = new sqlite3.Database(pathToDB, sqlite3.OPEN_READONLY);
function query(sql, params, cb) {
	if (!cb) {
		return new Promise((resolve) => {
			query(sql, params, (rows) => {
				resolve(rows);
			});
		});
	}
	
	db.all(sql, ...params, (err, rows) => {
		cb(rows);
	});
}

module.exports = {
	query,
	getUnixTimestamp: _db.getUnixTimestamp,
};