"use strict";
/**
 *    Object containing the middleware of getStatic API
 */
module.exports = {
	"middleware1": function (req, res, next) {
		console.log("inside Business Logic of getStatic API");
		return next();
	},
	
	"middleware2": function (req, res) {
		let myString = 'This is a static string';
		return res.soajs.returnAPIResponse(req, res, { code: 400, error: null, data: myString });
	}
};