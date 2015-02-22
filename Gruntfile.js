
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'test/**/*.js']
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		},
		mochacli: {
			options: {
				ui: 'tdd',
				reporter: 'spec'
			},
			all: ['test/*.js']
		}
	});

	if (!grunt.file.exists('logs')) {
		grunt.file.mkdir('logs');
	}

	grunt.loadNpmTasks('grunt-mocha-cli');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', [
		'jshint',
		'watch'
	]);

	grunt.registerTask('test', [
		'mochacli'
	]);

};