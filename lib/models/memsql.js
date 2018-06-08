"use strict";
var mysql      = require('mysql');

//both variables should be equivalent to the databases list in the registry
var database = "myDatabase";
var collection = 'myCollection';

var lib = {
	/**
	 * function that sets the default values if needed
	 * @param opts {Object}
	 */
	"defaults": function (opts) {
		if (!opts.database) {
			opts.database = database
		}
		if (!opts.collection) {
			opts.collection = collection
		}
	},
	
	/**
	 * function that executes find in mongo
	 * @param soajs {Object}
	 * @param opts {Object}
	 * @param cb {Function}
	 */
	"findEntries": function (soajs, opts, cb) {
		lib.defaults(opts);
		
		let connection = mysql.createConnection({
			host : soajs.registry.coreDB[opts.database].servers[0].host,
			port : soajs.registry.coreDB[opts.database].servers[0].port,
			user     : soajs.registry.coreDB[opts.database].credentials.username,
			password : soajs.registry.coreDB[opts.database].credentials.password,
			database : opts.database
		});
		
		soajs.log.debug("Connecting to MySQL Cluster:", soajs.registry.coreDB[opts.database]);
		connection.connect();
		
		connection.query(`SELECT * FROM ${opts.collection}`, function (error, results) {
			connection.end();
			if(results){
				results = (results) ? JSON.parse(JSON.stringify(results)) : [];
			}
			return cb(error, results);
		});
	}
};

module.exports = lib;