var path = require('path');
var version = Math.random().toString().substr(2, 6);
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    grunt.initConfig({
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'iOS 7']
                    })
                ]
            },
            build: {
                src: 'build/css/**/*.css'
            }
        },
        copy: {
            test: {
                files: [
                    // makes all src relative to cwd
                    {
                        expand: true,
                        src: ['./*.html'],
                        dest: 'build/',
                        filter: 'isFile'
                    },
                    // makes all src relative to cwd
                    {
                        expand: true,
                        cwd: 'css/',
                        src: ['**'],
                        dest: 'build/css/',
                        filter: 'isFile'
                    },
                    // makes all src relative to cwd
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['**'],
                        dest: 'build/img/',
                        filter: 'isFile'
                    },
                    // makes all src relative to cwd
                    {
                        expand: true,
                        cwd: 'js/',
                        src: ['**'],
                        dest: 'build/js/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        clean: {
            test: {
                src: ['build/']
            },
            less: {
                src: ['assets/less']
            }
        },
        replace: {
            build: {
                src: ['build/*.html'],
                overwrite: true,
                replacements: [{
                    from: /js\/.*\.js/g,
                    to: function (matchedWord) {
                        if (matchedWord.indexOf('.min') === -1) {
                            return matchedWord + '?v=' + version;
                        }
                        return matchedWord;
                    }
                }, {
                    from: /css\/.*\.css/g,
                    to: function (matchedWord) {
                        if (matchedWord.indexOf('.min') === -1) {
                            return matchedWord + '?v=' + version;
                        }
                        return matchedWord;
                    }
                }, {
                    from: /img\/.*\.(png|jpg|jpeg)/g,
                    to: function (matchedWord) {
                        if (matchedWord.indexOf('.min') === -1) {
                            return matchedWord + '?v=' + version;
                        }
                        return matchedWord;
                    }
                }]
            }

        }

    });

    grunt.registerTask('default', 'dev', function () {
        grunt.task.run(['clean', 'copy', 'postcss', 'replace']);
    });


}