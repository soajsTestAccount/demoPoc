"use strict";
let path = require("path");

/**
 *    Object containing the middleware of readMongo API
 */
module.exports = {
	"middleware1": function (req, res, next) {
		req.soajs.log.debug("inside Business Logic of Read Data API");
		next();
	},
	
	"middleware2": function (req, res) {
		let dbModel = req.soajs.servicesConfig.demopoc.model;
		let dbName = req.soajs.servicesConfig.demopoc.database;
		
		req.soajs.log.debug("Getting List of Records from", dbModel);
		
		let modelToUse;
		if(dbModel === 'mongo'){
			//mongousers
			modelToUse = req.soajs.model;
		}
		else{
			//sqlusers
			modelToUse = require(path.normalize(__dirname + "/../models/" + dbModel + ".js"));
		}
		
		modelToUse.findEntries(req.soajs, {collection: "data", database: dbName }, (error, response) => {
			return res.soajs.returnAPIResponse(req, res, { code: 400, error: error, data: response });
		});
	}
};