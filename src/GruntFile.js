module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        vars: {
            folderRelease: '../release/',
            folderDebug: '../debug/',
            filesJs: ['js/**/*.js', '!js/libs/*.js', '!js/libs/**/*.js'],
            // ordered files for angular 'unregistered module' fix
            orderedFilesJs: ['js/common/*Controllers.js', 'js/**/*Controller.js', 'js/**/*.js', '!js/libs/*.js', '!js/libs/**/*.js']
        },

        jshint: {
            all: '<%= vars.filesJs %>'
        },

        concat: {
            options: { //separator: ';\n',
            },
            debug: {
                src: '<%= vars.orderedFilesJs %>',
                dest: '<%= vars.folderDebug %>js/app.js'
            },
            release: {
                src: '<%= vars.orderedFilesJs %>',
                dest: '<%= vars.folderRelease %>js/app.js'
            }
        },

        uglify: {
            options: {
                // mangle: false, //preserve var names
            },
            dist: {
                files: {
                    '<%= vars.folderRelease %>js/app.js': '<%= vars.folderRelease %>js/app.js'
                }
            }
        },

        wrap: {
            debug: {
                src: '<%= vars.folderDebug %>js/app.js',
                dest: '<%= vars.folderDebug %>js/app.js',
                options: {
                    wrapper: ['(function () {', '\n}());']
                }
            },
            release: {
                src: '<%= vars.folderRelease %>js/app.js',
                dest: '<%= vars.folderRelease %>js/app.js',
                options: {
                    wrapper: ['(function () {', '\n}());']
                }
            }
        },

        compass: { // Task
            dist: { // Target
                options: {
                    sassDir: 'css',
                    cssDir: '<%= vars.folderRelease %>css',
                    environment: 'production',
                    outputStyle: 'compressed',
                    force: true
                }
            },
            debug: { // Another target
                options: {
                    sassDir: 'css',
                    cssDir: '<%= vars.folderDebug %>css',
                    force: true
                }
            }
        },

        // For DEV
        watch: {
            js: {
                files: '<%= vars.filesJs %>',
                tasks: ['jshint', 'concat:debug', 'wrap:debug'],
                options: {
                    livereload: true,
                    spawn: false
                }
            },

            css: {
                files: ['css/**/*.scss'],
                tasks: ['compass:debug'],
                options: {
                    livereload: true,
                    spawn: false
                }
            },

            img: {
                files: ['img/*.{png,jpg,gif}', 'img/**/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    livereload: true,
                    spawn: false
                }
            },

            html: {
                files: ['*.html', 'partials/*.html'],
                tasks: ['copy:debug'],
                options: {
                    livereload: true,
                    spawn: false
                }
            },

            libs: {
                files: ['css/libs/**', 'js/libs/**'],
                tasks: ['copy:debugLibs'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        },

        imagemin: {
            debug: {
                files: [{
                    expand: true, // Enable dynamic expansion
                    src: ['img/*.{png,jpg,gif}', 'img/**/*.{png,jpg,gif}'],
                    dest: '<%= vars.folderDebug %>'
                }]
            },
            release: {
                files: [{
                    expand: true,
                    src: ['img/*.{png,jpg,gif}', 'img/**/*.{png,jpg,gif}'],
                    dest: '<%= vars.folderRelease %>'
                }]
            }
        },

        copy: {
            debug: {
                files: [{
                    expand: true,
                    src: ['*.html', 'partials/**'],
                    dest: '<%= vars.folderDebug %>'
                }]
            },
            debugLibs: {
                files: [{
                    expand: true,
                    src: ['css/libs/**', 'js/libs/**'],
                    dest: '<%= vars.folderDebug %>'
                }]
            },
            release: {
                files: [{
                    expand: true,
                    src: ['*.html', 'partials/**', 'css/libs/**', 'js/libs/**'],
                    dest: '<%= vars.folderRelease %>'
                }]
            }
        },

        jasmine: {
            debug: {
                // src: ['../js/**/*.js', '!js/libs/**'],
                src: ['../debug/js/app.js'],
                // src: ['js/*.js'],
                options: {
                    specs: 'tests/spec/*Spec.js',
                    helpers: 'tests/spec/*Helper.js',
                    // template : 'src/custom.tmpl',
                    vendor: [
                        "../debug/js/libs/angular/angular.min.js",
                        "../debug/js/libs/angular-ui-router/release/angular-ui-router.min.js",
                        "../debug/js/libs/angular-animate/angular-animate.min.js",
                        "../debug/js/libs/angular-mocks/angular-mocks.js"
                    ]
                }
            }
        }

    });

    grunt.registerTask('default', ['jshint', 'concat:debug', 'wrap:debug', 'compass:debug', 'copy:debug', 'copy:debugLibs', 'imagemin:debug']);
    grunt.registerTask('release', ['jshint', 'concat:release', 'wrap:release', 'uglify', 'compass:dist', 'copy:release', 'imagemin:release']);
};
