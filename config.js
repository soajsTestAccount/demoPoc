"use strict";
module.exports = {
	"type": "service",
	"prerequisites": {
		"cpu": " ",
		"memory": " "
	},
	"swagger": true,
	"serviceName": "demopoc",
	"serviceGroup": "demo",
	"serviceVersion": 1,
	"servicePort": 4110,
	"requestTimeout": 30,
	"requestTimeoutRenewal": 5,
	"extKeyRequired": true,
	"injection": true,
	"oauth": false,
	"urac": false,
	"urac_Profile": false,
	"urac_ACL": false,
	"provision_ACL": false,
	"session": false,
	"dbs": [
		{
			"prefix": "",
			"name": "myDatabase",
			"mongo": true,
			"multitenant": false
		}
	],
	"models": {
		"path": "/opt/soajs/node_modules/demopoc/lib/models/",
		"name": "mongo"
	},
	"errors": {
		"400": "Database error"
	},
	"schema": {
		"get": {
			"/getStatic": {
				"_apiInfo": {
					"group": "general",
					"l": "Return a static string"
				},
				"mw": __dirname + "/lib/mw/getstatic_get.js",
				"imfv": {
					"custom": {}
				}
			},
			"/readData": {
				"_apiInfo": {
					"group": "general",
					"l": "Read Data from Database"
				},
				"mw": __dirname + "/lib/mw/readdata_get.js",
				"imfv": {
					"custom": {}
				}
			}
		}
	}
};