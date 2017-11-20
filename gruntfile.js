module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.loadNpmTasks("grunt-makeHTML");


    /* tie this to the current environment */
    var scripts = grunt.file.readJSON("src/config/development.scripts.json"),
        cssCore = grunt.file.readJSON("src/config/development.css.json"),
        productionScripts = grunt.file.readJSON("src/config/production.scripts.json"),
        productionCss = grunt.file.readJSON("src/config/production.css.json");


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/* <%=pkg.name %> - version <%= pkg.version %> - ' +
        '<%= grunt.template.today("dd-mm-yyyy") %>\n' +
        '<%= pkg.description %>\n ' +
        '&#169 <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n',
        usebanner: {
            taskName: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>',
                    linebreak: true
                },
                files: {
                    src: [ 'css/**/*.css' ]
                }
            }
        },
        cssmin: {
            options: {
                banner: '/* My minified css file */',
                expand: true,
                cwd: "/src"
            },
            target: {
                src: cssCore,
                dest: 'production/css/love2dev.min.css'
            }
        },
        less: {
            dev: {
                options: {
                    strictMath: true,
                    sourceMap: false,
                    outputSourceFiles: true,
                    //         compress: true,
                    banner: "//Copyright 2016-17 Love2Dev.com\r\n"
                },
                files: [{
                    expand: true,
                    cwd: "site/www/src/less/",
                    src: ['**/**.less'],
                    dest: "site/www/src/css",
                    ext: '.css'
                }]
            }
        },
        uglify: {
            options: {
                compress: {}
            },
            applib: {
                src: [
                    "src/js/libs/spa.js",
                    "src/js/libs/class.js",
                    "src/js/libs/controller.js",
                    "src/js/libs/dollarbill.min.js",
                    "src/js/libs/simpleViewEngine.js",
                    "src/js/libs/l2Storagecache.js",
                    "src/js/libs/ui/toolbar.min.js",
                    "src/js/libs/ui/modal.js",
                    "src/js/libs/ui/preloader.js",
                    "src/js/libs/ui/pop-up-promotional.js",
                    "src/js/libs/ajax.js",
                    "src/js/dev/services/newsletter.manager.js",
                    "src/js/dev/services/promo.manager.js",
                    "src/js/dev/services/content.manager.js",
                    "src/js/dev/Love2Dev.app.js",
                    "src/js/dev/Love2Dev.controller.js",
                    "src/js/dev/Love2Dev.Newsletter.controller.js",
                    "src/js/dev/controllers/**.js",
                    "src/js/dev/Love2Dev.bootstrap.js"
                ],
                dest: 'src/js/love2dev.min.js'
            }
        },
        copy: {
            html: {
                expand: true,
                src: ['src/*.html'],
                dest: 'development/'
            },
            css: {
                expand: true,
                cwd: "src",
                src: ['css/**/*.css'],
                dest: 'development/'
            },
            prodcss: {
                expand: true,
                src: ['src/css/love2dev.min.css'],
                dest: 'production/'
            },
            img: {
                expand: true,
                cwd: "src",
                src: ['**/*.jpg', '**/*.ico', '**/*.gif', '**/*.png'],
                dest: 'development/'
            },
            // data: {
            //     expand: true,
            //     cwd: "src",
            //     src: ['**/*.json'],
            //     dest: 'development/'
            // },
            assets: {
                expand: true,
                src: ['src/**/*.txt', 'src/**/*.rss', 'src/**/*.xml', 'src/**/*.cache'],
                dest: 'development/'
            },
            js: {
                expand: true,
                cwd: "src",
                src: ['js/**/*.js'],
                dest: 'development/'
            },
            prodjs: {
                expand: true,
                src: ['src/js/love2dev.min.js'],
                dest: 'production/'
            },
            development: {
                expand: true,
                cwd: "src",
                src: ['**/*.jpg', '**/*.ico', '**/*.gif', '**/*.png', '**/*.js', 'css/**/*.css', 'img/**/*.*', '**/*.txt', '**/*.rss', '**/*.xml', '**/*.cache', '**/*.json', 'fonts/**/*.*'],
                dest: 'development/'
            },
            production: {
                expand: true,
                cwd: "src",
                src: ['**/*.jpg', '**/*.ico', '**/*.gif', '**/*.png', 'img/**/*.*', '**/*.txt', '**/*.rss', '**/*.xml', '**/*.cache', '**/*.json', 'fonts/**/*.*', 'js/love2dev.min.js'],
                dest: 'production/'
            }
        },
        bump: {
            options: {
                push: false,
                commit: false
            }
        },
        clean: {
            css: ['development/css/**/*.css', 'development/css/**/*.map'],
            js: ['development/**/*.js'],
            html: ['development/*.html'],
            development: ['development/**/*.html', 'development/**.js', 'development/**.css'],
            production: ['production']
        },
        watch: {
            less: {
                files: [
                    'src/less/**/**.less'
                ],
                tasks: ['clean:css', 'less', 'copy:css']
            },
            js: {
                files: [
                    'src/js/**/**.js'
                ],
                tasks: ['copy:js']
            },
            data: {
                files: [
                    'src/data/**/**.json'
                ],
                tasks: ['copy:data']
            },
            img: {
                files: ['**/*.jpg', '**/*.ico', '**/*.gif', '**/*.png'],
                tasks: ["copy:img"]
            },
            makeHTML: {
                files: [
                    'src/html/**/**.html'
                ],
                tasks: ['makeHTML:development']
            }
        },
        makeHTML: {
            development: {
                options: {
                    cwd: "src",
                    indexSrc: "html/index.html",
                    styles: cssCore,
                    src: [
                        "html/layouts/*.html",
                        "html/views/*.html",
                        "html/templates/*.html"
                    ],
                    scripts: scripts,
                    dest: "development/index.html"
                }
            },
            production: {
                options: {
                    indexSrc: "html/index.html",
                    cwd: "src",
                    inlineCSS: true,
                    styles: productionCss,
                    src: [
                        "html/layouts/*.html",
                        "html/views/*.html",
                        "html/templates/*.html"
                    ],
                    scripts: ['js/love2dev.min.js'],
                    dest: "production/index.html"
                }
            }
        },

        connect: {
            localhost: {
                options: {
                    port: 57661,
                    //                    base: "life-cycle",
                    base: "site/www/localhost",
                    keepalive: true
                }
            },
            production: {
                options: {
                    port: 57665,
                    base: "production",
                    keepalive: true
                }
            },
            development: {
                options: {
                    port: 57660,
                    base: "development",
                    keepalive: true
                }
            }
        }

    });


    // Default task.
    grunt.registerTask('default', ['less', 'makeHTML', 'copy:development']);

    grunt.registerTask('development', [/*'clean:development',*/ /*'less',*/ 'makeHTML:development', 'copy:development']);

    grunt.registerTask('production', ['less', 'cssmin', 'uglify', 'makeHTML:production', 'copy:production']);

};