'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var IfyGenerator = yeoman.generators.Base.extend({

	constructor: function() {

		yeoman.generators.Base.apply(this, arguments);

		// this option is used mostly for testing but might be in other cases also
		this.option( 'noNPM', {

			desc: 'Pass this option to not run npm install',
			type: 'Boolean',
			defaults: false
		});

		this.option( 'grunt', {

			desc: 'If you want to use grunt pass in this option',
			type: 'Boolean',
			defaults: false
		});

		this.option( 'localServer', {

			desc: 'If you want to use a local server pass in this option',
			type: 'Boolean',
			defaults: false
		});
	},

	initializing: function() {

		var s = this.config.get( 'settings' ) || {};

		if( this.options.grunt )
			s.useGrunt = true;

		if( this.options.localServer )
			s.useLocalServer = true;

		this.config.set( 'settings', s );
	},

	prompting: { 

		header: function() {

			// Have Yeoman greet the user.
			this.log(yosay(
				'Browserify projects quick and dirty!'
			));
		},

		askGrunt: function () {
			var done = this.async(),
				s = this.config.get( 'settings' ) || {};

			if( s.useGrunt === undefined ) {

				var prompts = [{
					type: 'confirm',
					name: 'useGrunt',
					message: 'Do you want to use grunt?',
					default: true
				}];

				this.prompt(prompts, function (props) {

					s.useGrunt = props.useGrunt;
					this.config.set( 'settings', s );

					done();
				}.bind(this));
			} else {

				done();
			}
		},

		askLocalServer: function() {

			var done = this.async(),
				s = this.config.get( 'settings' ) || {};

			if( s.useGrunt && s.useLocalServer === undefined ) {

				var prompts = [{
					type: 'confirm',
					name: 'useLocalServer',
					message: 'Do you want a local dev server?',
					default: true
				}];

				this.prompt(prompts, function (props) {

					s.useLocalServer = props.useLocalServer;
					this.config.set( 'settings', s );

					done();
				}.bind(this));
			} else {

				done();
			}
		}
	},

	configuring: {

		grunt: function() {

			var s = this.config.get( 'settings' ) || {};

			// if we're using Grunt then we want to setup a grunt file
			if( s.useGrunt ) {

				var defaultTask = [ 'browserify:dev' ];

				// setup browserify
				this.gruntfile.insertConfig( 'browserify', JSON.stringify( {
					dev: {
						src: './index.js',
						dest: 'app/js/bundle.js',
						options: {
							debug: true,
							watch: true,
							verbose: true,
							open: true
						}
					},
					release: {
						src: './index.js',
						dest: 'app/js/bundle.js',
						options: {
							debug: false,
							verbose: false
						}
					}
				}));

				this.gruntfile.loadNpmTasks( 'grunt-browserify' );


				// add in grunt-connect if we want a local dev server
				if( s.useLocalServer ) {

					this.gruntfile.insertConfig( 'connect', JSON.stringify( { 
						devServer: {
							options: {

								base: 'app/',
								keepalive: true
							}
						}
					}));

					this.gruntfile.loadNpmTasks( 'grunt-contrib-connect' );

					defaultTask.push( 'connect' );
				}

				this.gruntfile.registerTask( 'default', defaultTask );
				this.gruntfile.registerTask( 'release', [ 'browserify:release' ] );

				this.dest.write( 'Gruntfile.js', this.gruntfile.toString() );
			}
		}
	},

	writing: {
		app: function () {

			// make root folder
			this.src.copy('_package.json', 'package.json');
			this.src.copy('_index.js', 'index.js');

			// make app folder
			this.dest.mkdir('app');
			this.src.copy('_index.html', 'app/index.html');      
		}
	},

	install: function () {

		var done = this.async(),
			s = this.config.get( 'settings' ) || {},
			deps = [];

		// if we're using Grunt then we want to setup a grunt file
		if( s.useGrunt ) {

			
			deps.push( 'grunt-browserify' );

			// add in grunt-connect if we want a local dev server
			if( s.useLocalServer ) {

				deps.push( 'grunt-contrib-connect' );
			}
		}

		if( !this.options.noNPM )
			this.npmInstall( deps, { 'save-dev': true }, done );
		else
			done();
	}
});

module.exports = IfyGenerator;
