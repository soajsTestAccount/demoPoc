"use strict";
/**
 *    Object containing the middleware of getStatic API
 */
module.exports = {
	"middleware": function (req, res) {
		let myString = 'This is a static string';
		return res.soajs.returnAPIResponse(req, res, { code: 400, error: null, data: myString });
	}
};