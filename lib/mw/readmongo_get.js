"use strict";
/**
 *    Object containing the middleware of readMongo API
 */
module.exports = {
	"middleware1": function (req, res, next) {
		console.log("inside Business Logic of readMongo API");
		next();
	},
	
	"middleware2": function (req, res) {
		req.soajs.model.findEntries(req.soajs, opts, function (error, response) {
			return res.soajs.returnAPIResponse(req, res, { code: 400, error: error, data: response });
		});
		
	}
};