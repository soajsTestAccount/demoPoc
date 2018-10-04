"use strict";
/**
 *    Object containing the middleware of getStatic API
 */
module.exports = {
	"middleware": function (req, res) {
		
		req.soajs.awareness.getHost('controller', function (host) {
			console.log(hosts);
			
			let myString = 'Hello World, this is a demo POC';
			return res.soajs.returnAPIResponse(req, res, { code: 400, error: null, data: myString });
		});
	}
};