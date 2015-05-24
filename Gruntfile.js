'use strict';

module.exports = function (grunt) {

	var appConfig = {
		dist: '.build',
		res: 'public',
		bower_root: 'public/components'
	};

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
			},

			// when this task is run, lint the Gruntfile and all js files in src
			build: ['Grunfile.js', '*.js', 'lib/**/*.js', 'public/**/*.js', 'routes/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

};
