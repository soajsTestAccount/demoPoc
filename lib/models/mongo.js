"use strict";
const Mongo = require("soajs").mongo;

//both variables should be equivalent to the databases list in the registry
// var database = "myDatabase";
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
		if (!Object.hasOwnProperty.call(opts, 'versioning')) {
			opts.versioning = false;
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
		soajs.log.debug("Connecting to Mongo Cluster:", soajs.registry.coreDB[opts.database]);
		let mongo = new Mongo(soajs.registry.coreDB[opts.database]);
		mongo.find(opts.collection, {}, cb);
	}
};

module.exports = lib;