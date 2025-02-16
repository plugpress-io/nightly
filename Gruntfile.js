module.exports = function (grunt) {
	grunt.initConfig({
		copy: {
			main: {
				options: {
					mode: true,
				},
				src: [
					'**',
					'!dist/*.js.map',
					'!dist/*.css.map',
					'!node_modules/**',
					'!.git/**',
					'!*.sh',
					'!eslintrc.json',
					'!README.md',
					'!Gruntfile.js',
					'!package.json',
					'!package-lock.json',
					'!.eslintrc',
					'!.gitignore',
					'!.gitattributes',
					'!vendor/**',
					'!src/**',
					'!scripts/**',
					'!bin/**',
					'!*.zip',
				],
				dest: 'nightly/',
			},
		},
		compress: {
			main: {
				options: {
					archive: 'nightly.zip',
					mode: 'zip',
				},
				files: [
					{
						src: ['./nightly/**'],
					},
				],
			},
		},
		clean: {
			main: ['nightly'],
			zip: ['*.zip'],
		},
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('release', [
		'clean:zip',
		'copy',
		'compress',
		'clean:main',
	]);

	grunt.registerTask('release-no-clean', ['clean:zip', 'copy']);
};
