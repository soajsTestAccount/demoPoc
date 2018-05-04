"use strict";
/**
 *    Object containing the middleware of readMongo API
 */
module.exports = {
	"middleware1": function (req, res, next) {
		req.soajs.log.debug("inside Business Logic of readMongo API");
		next();
	},
	
	"middleware2": function (req, res) {
		req.soajs.log.debug("Getting List of Records from Mongo.");
		req.soajs.model.findEntries(req.soajs, {collection: "data", database: "mongousers"}, (error, response) => {
			return res.soajs.returnAPIResponse(req, res, { code: 400, error: error, data: response });
		});
	}
};