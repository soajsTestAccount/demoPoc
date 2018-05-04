"use strict";
const path = require("path");
/**
 *    Object containing the middleware of readMemSql API
 */
module.exports = {
	"middleware1": function (req, res, next) {
		req.soajs.log.debug("inside Business Logic of readMemSql API");
		next();
	},
	
	"middleware2": function (req, res) {
		let modelToUse = require(path.normalize(__dirname + "/../models/memsql.js"));
		modelToUse.findEntries(req.soajs, {collection: "data", database: "sqlusers"}, (error, response) => {
			return res.soajs.returnAPIResponse(req, res, { code: 400, error: error, data: response });
		});
	}
};