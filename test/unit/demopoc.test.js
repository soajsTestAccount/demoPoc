"use strict";
var assert = require('assert');
var helper = require("../helper.js");

describe("demopoc Unit Test Cases", function () {

	before(function (done) {
        console.log("==============>");
        done();
    });

	after(function (done) {
        console.log("<==============");
        done();
    });

	it("success - test", function(done){

		done();
	});

	it("fail - test", function(done){

        done();
    });
});
