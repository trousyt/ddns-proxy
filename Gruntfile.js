
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	if (!grunt.file.exists('logs')) {
		grunt.file.mkdir('logs');
	}

	grunt.registerTask('default', []);

};