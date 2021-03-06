'use strict';

var fs = require('fs');
var path = require('path');

var lib = {
	/**
	 * Function that find the root path where grunt plugins are installed.
	 *
	 * @method findRoot
	 * @return String rootPath
	 */
	findRoot: function () {
		var cwd = process.cwd();
		var rootPath = cwd;
		var newRootPath = null;
		while (!fs.existsSync(path.join(process.cwd(), "node_modules/grunt"))) {
			process.chdir("..");
			newRootPath = process.cwd();
			if (newRootPath === rootPath) {
				return;
			}
			rootPath = newRootPath;
		}
		process.chdir(cwd);
		return rootPath;
	},
	/**
	 * Function load the npm tasks from the root path
	 *
	 * @method loadTasks
	 * @param grunt {Object} The grunt instance
	 * @param tasks {Array} Array of tasks as string
	 */
	loadTasks: function (grunt, rootPath, tasks) {
		tasks.forEach(function (name) {
			if (name === 'grunt-cli') return;
			var cwd = process.cwd();
			process.chdir(rootPath); // load files from proper root, I don't want to install everything locally per module!
			grunt.loadNpmTasks(name);
			process.chdir(cwd);
		});
	}
};

module.exports = function (grunt) {
	//Loading the needed plugins to run the grunt tasks
	var pluginsRootPath = lib.findRoot();
	lib.loadTasks(grunt, pluginsRootPath, ['grunt-contrib-jshint', 'grunt-jsdoc', 'grunt-contrib-clean', 'grunt-mocha-test', 'grunt-env'
		, 'grunt-istanbul', 'grunt-coveralls', 'grunt-soajs']);
	grunt.initConfig({
		//Defining jshint tasks
		jshint: {
			options: {
				"bitwise": true,
				"eqeqeq": true,
				"forin": true,
				"newcap": true,
				"noarg": true,
				"undef": true,
				"unused": false,
				"eqnull": true,
				"laxcomma": true,
				"loopfunc": true,
				"sub": true,
				"supernew": true,
				"validthis": true,
				"node": true,
				"maxerr": 100,
				"indent": 2,
				"globals": {
					"describe": false,
					"it": false,
					"before": false,
					"beforeEach": false,
					"after": false,
					"afterEach": false
				},
				ignores: ['test/coverage/**/*.js']
			},
			files: {
				src: ['service/**/*.js']
			},
			gruntfile: {
				src: 'Gruntfile.js'
			}
		},
		
		env: {
			mochaTest: {
				SOAJS_TEST: true,
				APP_DIR_FOR_CODE_COVERAGE: '../',
				SOAJS_SRVIP: '127.0.0.1'
			},
			coverage: {
				SOAJS_TEST: true,
				APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/',
				SOAJS_SRVIP: '127.0.0.1'
			}
		},

		clean: {
			doc: {
				src: ['doc/']
			}
		},

		instrument: {
			files: ['*.js', 'lib/*/*.js'],
			options: {
				lazy: false,
				basePath: 'test/coverage/instrument/'
			}
		},

		mochaTest: {
			unit: {
				options: {
					reporter: 'spec',
					timeout: 90000
				},
				src: ['test/unit/_server.test.js']
			},
			integration: {
				options: {
					reporter: 'spec',
					timeout: 90000
				},
				src: ['test/integration/_server.test.js']
			}
		}
	});

	process.env.SHOW_LOGS = grunt.option('showLogs');
	grunt.registerTask("default", ['jshint']);
	grunt.registerTask("build", ['swagger2soajs:build']);
    grunt.registerTask("rebuild", ['swagger2soajs:rebuild']);
	grunt.registerTask("integration", ['env:mochaTest', 'mochaTest:integration']);
	grunt.registerTask("unit", ['env:mochaTest', 'mochaTest:unit']);
	grunt.registerTask("coverage", ['clean', 'env:coverage', 'instrument', 'mochaTest:unit']);

};

