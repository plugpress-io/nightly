module.exports = function (grunt) {
	grunt.initConfig({
		// Clean directories
		clean: {
			build: ['build/**/*'],
			dist: ['nightly/**/*'],
			zip: ['*.zip'],
			all: ['build', 'nightly', '*.zip']
		},

		// Run webpack build
		webpack: {
			options: {
				stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
			},
			prod: require('./webpack.config.js'),
			dev: Object.assign({ watch: false }, require('./webpack.config.js'))
		},

		// Generate POT file for translations
		makepot: {
			target: {
				options: {
					domainPath: '/languages',
					exclude: [
						'build/.*',
						'node_modules/.*',
						'vendor/.*',
						'tests/.*',
						'bin/.*'
					],
					mainFile: 'nightly.php',
					potFilename: 'nightly.pot',
					potHeaders: {
						poedit: true,
						'x-poedit-keywordslist': true
					},
					type: 'wp-plugin',
					updateTimestamp: true,
					updatePoFiles: true
				}
			}
		},

		// Process language files
		po2mo: {
			files: {
				src: 'languages/*.po',
				expand: true,
			},
		},

		// Copy files for distribution
		copy: {
			main: {
				options: {
					mode: true,
				},
				src: [
					'**',
					'!build/*.js.map',
					'!build/*.css.map',
					'!build/**/*.asset.php',
					'!node_modules/**',
					'!.git/**',
					'!.github/**',
					'!.vscode/**',
					'!src/**',
					'!tests/**',
					'!bin/**',
					'!vendor/**',
					'!*.sh',
					'!*.md',
					'!Gruntfile.js',
					'!webpack.config.js',
					'!package.json',
					'!package-lock.json',
					'!.eslintrc*',
					'!.gitignore',
					'!.gitattributes',
					'!.distignore',
					'!.DS_Store',
					'!*.zip',
					'!phpcs.xml',
					'!phpunit.xml',
					'!composer.json',
					'!composer.lock'
				],
				dest: 'nightly/',
			},
			languages: {
				expand: true,
				cwd: 'languages/',
				src: ['*.mo', '*.po', '*.pot'],
				dest: 'nightly/languages/',
			}
		},

		// Create zip file
		compress: {
			main: {
				options: {
					archive: 'nightly.zip',
					mode: 'zip',
					level: 9
				},
				files: [
					{
						expand: true,
						cwd: 'nightly/',
						src: ['**/*'],
						dest: 'nightly/'
					}
				]
			}
		},

		// Watch for changes during development
		watch: {
			webpack: {
				files: ['src/**/*'],
				tasks: ['webpack:dev'],
				options: {
					spawn: false,
				}
			},
			languages: {
				files: ['languages/*.po'],
				tasks: ['po2mo'],
				options: {
					spawn: false,
				}
			}
		},

		// Version bump
		version: {
			options: {
				prefix: 'Version:\\s*'
			},
			project: {
				src: ['nightly.php', 'readme.txt']
			}
		}
	});

	// Load npm tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-wp-i18n');
	grunt.loadNpmTasks('grunt-po2mo');
	grunt.loadNpmTasks('grunt-version');

	// Register tasks
	grunt.registerTask('build', [
		'clean:build',
		'webpack:prod'
	]);

	grunt.registerTask('build:dev', [
		'clean:build',
		'webpack:dev'
	]);

	grunt.registerTask('i18n', [
		'makepot',
		'po2mo'
	]);

	grunt.registerTask('dist', [
		'clean:all',
		'build',
		'i18n',
		'copy:main',
		'copy:languages'
	]);

	grunt.registerTask('release', [
		'dist',
		'compress',
		'clean:dist'
	]);

	grunt.registerTask('release-keep-files', [
		'dist',
		'compress'
	]);

	grunt.registerTask('dev', [
		'build:dev',
		'watch'
	]);

	grunt.registerTask('default', ['build']);
};
