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
  "servicePort": 5110,
  "requestTimeout": 30,
  "requestTimeoutRenewal": 5,
  "extKeyRequired": false,
  "injection": true,
  "oauth": false,
  "urac": false,
  "urac_Profile": false,
  "urac_ACL": false,
  "provision_ACL": false,
  "session": false,
  "errors": {},
  "schema": {},
  "dbs": [
    {
      "prefix": "",
      "name": "dbPoc",
      "mongo": true,
      "multitenant": false
    }
  ],
  "models": {
    "path": __dirname + "/lib/models/",
    "name": "mongo"
  }
};