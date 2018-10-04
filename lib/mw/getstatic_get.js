"use strict";
var request = require("request");
/**
 *    Object containing the middleware of getStatic API
 */
module.exports = {
	"middleware": function (req, res) {
		
		req.soajs.awareness.getHost('controller', function (host) {
			console.log(host);
			
			let maintenance = req.soajs.registry.services.controller.port + 1000;
			let options = {
				"uri": 'http://' + host + ':' + maintenance + "/heartbeat",
				"headers": {
					'Content-Type': 'application/json',
					'accept': 'application/json',
					'connection': 'keep-alive',
				},
				"json": true
			};
			
			req.soajs.log.debug(options);
			request.post(options, (error, response, body) => {
				if (error) {
					console.log("Error:", error);
				}
				else{
					console.log(JSON.stringify(body, null, 2));
				}
			});
			
			let myString = 'Hello World, this is a demo POC';
			return res.soajs.returnAPIResponse(req, res, { code: 400, error: null, data: myString });
		});
	}
};