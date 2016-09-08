module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        clean: {
            dev: ['dev']
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
                files: [
                    {expand:true, cwd:'src', src: ['**', '!**/*.spec.js', '!index.tpl.html'], dest: 'dev'}
                ]
            }
        },
        includeSource: {
            /**
             * Generate an index.html file that includes `<script>` tags for all our scripts
             * See the markup in src/index.tpl.html for special "include" comments that specify where these
             *     `<script>` tags will be inserted
             */
            dev: {
                options: {
                    basePath: 'dev'
                },
                files: {
                    'dev/index.html': 'src/index.tpl.html'
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
        watch: {
            options: {
                livereload: true  // Install the livereload Chrome extension to have the page automatically reload
                                  // after the tasks have been run
            },
            /**
             * When any files change, we want to run unit tests and rebuild
             **/
            dev: {
                files: ['src/**/*', '!src/index.html'],
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-karma');
    // grunt.loadNpmTasks('grunt-ng-annotate');  // TODO: Include for minification (along with uglify)

    /**
     * Builds the dev source
     */
    grunt.registerTask('build', [
        'clean:dev',
        'copy:dev',
        'includeSource:dev'
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
     * By default, we want to start up the dev server and start watching files
     */
    grunt.registerTask('default', ['dev']);
};
