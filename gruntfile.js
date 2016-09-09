module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        /**
         * Read the package.json file into here so we can add build params to it
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Cleans build and compile destinations before we build and compile
         */
        clean: {
            dev: ['dev'],
            dist: ['dist']
        },
        /**
         * Starts a simple web server to server our project's contents for local development
         */
        connect: {
            server: {
                options: {
                    port: 8080
                }
            }
        },
        copy: {
            /**
             * Copy all the source files needed to run the app over to a clean /dev folder
             */
            dev: {
                files: [{
                    expand:true,
                    cwd:'src',
                    src: ['**', '!**/*.spec.js', '!**/*.scss', '!index.tpl.html'],
                    dest: 'dev'
                }]
            }
        },
        cssmin: {
            /**
             * Minifies our css files for production
             */
            dist: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.css': [
                        // '<%= pkg.vendorFiles.css %>',  // don't have any (yet)
                        'dev/**/*.css'
                    ]
                }
            }
        },
        html2js: {
            /**
             * Bundles up our html templates into a single js file that pre-loads them into Angular's $templateCache
             */
            dist: {
                options: {
                    base: 'dev'
                },
                src: ['dev/**/*.tpl.html'],
                dest: 'dev/templates.js'
            }
        },
        /**
         * Generate an index.html file that includes `<script>` tags for all our scripts
         * See the markup in src/index.tpl.html for special "include" comments that specify where these
         *     `<script>` tags will be inserted
         */
        includeSource: {
            dev: {
                options: {
                    basePath: 'dev'
                },
                files: {
                    'dev/index.html': 'src/index.tpl.html'
                }
            },
            dist:{
                options: {
                    basePath: 'dist'
                },
                files: {
                    'dist/index.html': 'src/index.tpl.html'
                }
            }
        },
        karma: {
            /**
             * Run unit tests a single time
             * Used for running tests on CI builds
             */
            continuous: {
                configFile: 'karma.conf.js'
            },
            /**
             * Run unit tests in the background
             * Used in conjunction with `watch` to continually re-run unit tests whenever files change
             */
            unit: {
                configFile: 'karma.conf.js',
                background: true,
                singleRun: false
            }
        },
        /**
         * Annotates all our files with the proper Angular dependency injection syntax
         */
        ngAnnotate: {
            dist: {
                files: [{
                    src: ['**/*.js', '!**/*.mock.js'],
                    cwd: 'dev',
                    dest: 'dev',
                    ext: '.annotated.js',
                    extDot: 'last',
                    expand: true
                }]
            }
        },
        /**
         * Create css files from sass files
         */
        sass: {
            dev: {
                files: {
                    'dev/index.css': 'src/index.scss'
                }
            }
        },
        uglify: {
            /**
             * Minify our js files for production
             */
            dist:{
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': [
                        '<%= pkg.vendorFiles.js %>',
                        'dev/**/*.annotated.js'
                    ]
                }
            }
        },
        watch: {
            options: {
                livereload: true  // Install the livereload Chrome extension to have the page automatically reload
                                  // after the tasks have been run
            },
            /**
             * When any files change, we want to run unit tests and rebuild
             * @TODO Could get more fine-grained about only reloading certain things depending on what changed.
             *     ...But this is plenty fast for now.
             **/
            dev: {
                files: ['gruntfile.js', 'karma.conf.js', 'src/**/*', '!src/index.html'],
                tasks: [
                    'karma:unit:run',
                    'build'
                ]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-sass');

    /**
     * Builds the dev source
     */
    grunt.registerTask('build', [
        'clean:dev',
        'copy:dev',
        'sass:dev',
        'includeSource:dev'
    ]);
    
    grunt.registerTask('compile', [
        'clean:dist',
        'build',
        'html2js:dist',
        'ngAnnotate:dist',
        'uglify:dist',
        'cssmin:dist',
        'includeSource:dist'
    ]);

    /**
     * Runs tests and starts up the dev server
     */
    grunt.registerTask('init-dev', [
        'karma:continuous',
        'build',
        'karma:unit',
        'connect'
    ]);

    /**
     * Watches files after starting the dev server
     */
    grunt.registerTask('dev', ['init-dev', 'watch:dev']);

    /**
     * By default, we want to build, compile, start up the dev server, and start watching files
     */
    grunt.registerTask('default', ['compile', 'dev']);
};
