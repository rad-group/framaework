module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass_globbing_lobae: {
      make_import: {
        files: {
          'css/import/_variables.sass': 'css/dev/variables/**/*.sass',
          'css/import/_grid.sass': 'css/dev/grid/**/*.sass',
          'css/import/_layout.sass': 'css/dev/layout/**/*.sass',
          'css/import/_text.sass': 'css/dev/text/**/*.sass',
          'css/import/_blocks.sass': 'css/dev/blocks/**/*.sass',
          'css/import/_resets.sass': 'css/dev/_resets.sass'
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/framaework.min.css': ['css/framaework.css']
        }
      }
    },
    uglify: {
      global: {
        options: {
          beautify: false,
          mangle: false
        },
        files: {
          'js/gen/global.min.js': ['js/dev/global/*.js']
        }
      },
      plugins: {
        options: {
          beautify: false,
          mangle: false
        },
        files: {
          'js/gen/plugins.min.js': ['js/dev/plugins/*.js']
        }
      }
    },
    sass: {
      dist: {
        options: {                       // Target options
          sourcemap: 'none',
          update: true
        },
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.sass'],
          dest: 'css/',
          ext: '.css'
        }]
      }
    },
    webfont: {
      light: {
        src: 'iconae/svg/light/*.svg',
        dest: 'fonts/iconae/light/',
        destCss: 'css/dev/iconae',
        options: {
          engine: 'node',
          stylesheet: 'sass',
          font: 'iconae-light',
          template: 'iconae/tmpl/tmpl_iconae.css',
          templateOptions: {
            baseClass: 'iconae light',
            classPrefix: 'ae--'
          },
          types: 'eot,woff2,woff,ttf,svg',
          htmlDemo: false
        }
      },
      regular: {
        src: 'iconae/svg/regular/*.svg',
        dest: 'fonts/iconae/regular/',
        destCss: 'css/dev/iconae',
        options: {
          engine: 'node',
          stylesheet: 'sass',
          font: 'iconae-regular',
          template: 'iconae/tmpl/tmpl_iconae.css',
          htmlDemoTemplate: 'iconae/tmpl/tmpl_specimen.html',
          templateOptions: {
            baseClass: 'iconae regular',
            classPrefix: 'ae--'
          },
          types: 'eot,woff2,woff,ttf,svg',
          htmlDemo: true,
          htmlDemoFilename: 'specimen',
          destHtml: 'iconae/'
        }
      },
      bold: {
        src: 'iconae/svg/bold/*.svg',
        dest: 'fonts/iconae/bold/',
        destCss: 'css/dev/iconae',
        options: {
          engine: 'node',
          stylesheet: 'sass',
          font: 'iconae-bold',
          template: 'iconae/tmpl/tmpl_iconae.css',
          templateOptions: {
            baseClass: 'iconae bold',
            classPrefix: 'ae--'
          },
          types: 'eot,woff2,woff,ttf,svg',
          htmlDemo: false
        }
      },
      filled: {
        src: 'iconae/svg/filled/*.svg',
        dest: 'fonts/iconae/filled/',
        destCss: 'css/dev/iconae',
        options: {
          engine: 'node',
          stylesheet: 'sass',
          font: 'iconae-filled',
          template: 'iconae/tmpl/tmpl_iconae.css',
          templateOptions: {
            baseClass: 'iconae filled',
            classPrefix: 'ae--'
          },
          types: 'eot,woff2,woff,ttf,svg',
          htmlDemo: false
        }
      }
    },
    watch: {
      css: {
        files: '**/*.sass',
        tasks: ['sass_globbing_lobae','sass', 'cssmin']
      },
      js: {
        files: 'js/dev/**/**/*.js',
        tasks: ['uglify']
      }
    }
  });

  var fs = require('fs');
  var path = require('path');

  grunt.registerMultiTask('sass_globbing_lobae', function() {

    var importFiles = [];

    this.files.forEach(function(f) {

      var importStatement = '';
      var importStatements = [];

      if (!(f.dest in importFiles)) {
        importFiles[f.dest] = "";
      }

      f.src.forEach(function(filePath) {

        if (filePath === f.dest) {
          return;
          // if the current filePath is the same as the file.dest then skip this loop
        }

        var importPath = path.dirname(path.relative(path.dirname(f.dest), filePath));
        var fileName = path.basename(filePath);
        fileName = fileName.replace(/^_/, '');
        importPath += path.sep + fileName.replace(path.extname(fileName), '');

        importStatement = '@import ' + importPath.replace(/\\/g, '/').replace(/^\.\//, '') + '\n';

        if (importStatements.indexOf(importStatement) > -1) {
          throw new Error('There is also a partial next to file "'+ filePath + '" - merge partial _' + fileName + ' and ' + fileName + ' to solve this issue');
          //grunt.fail.warn('There is also a partial next to file "'+ filePath + '" - merge partial _' + fileName + ' and ' + fileName + ' to solve this issue' + "\n");
        }

        importStatements.push(importStatement);
        importFiles[f.dest] += importStatement;
      });
    });

    for (var index in importFiles) {
      grunt.file.delete(index);
      grunt.file.write(index, importFiles[index]);
      grunt.verbose.ok(importFiles[index]);
    }
  });

  // START Set JavaScript directories
  grunt.file.expand("js/dev/pages/*").forEach(function(dir) {

    // get the current ugli config
    var ugli = grunt.config.get('uglify') || {};

    // set the uglify for this modulename-directory
    ugli[dir] = {
     src: [dir + '/*.js'],
     dest: 'js/gen/pages/' +  dir.replace('js/dev/pages/','') + '.min.js'
    };

    // save the new ugli configuration
    grunt.config.set('uglify', ugli);
  });
  // END Set JavaScript directories

  grunt.loadNpmTasks('grunt-contrib-sass');
  //grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'webfont:light', 'webfont:regular', 'webfont:bold', 'webfont:filled', 'watch']);
}
