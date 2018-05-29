"use strict";
/**
 *    Object containing the middleware of getStatic API
 */
module.exports = {
	"middleware": function (req, res) {
		let myString = 'Hello World, this is a demo POC, my name is Mike';
		return res.soajs.returnAPIResponse(req, res, { code: 400, error: null, data: myString });
	}
};