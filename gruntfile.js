module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    sass_globbing: {
      make_import: {
        files: {
          'css/import/_variables.sass': 'css/dev/variables/**/*.sass',
          'css/import/_grid.sass': 'css/dev/grid/**/*.sass',
          'css/import/_layout.sass': 'css/dev/layout/**/*.sass',
          'css/import/_text.sass': 'css/dev/text/**/*.sass',
          'css/import/_blocks.sass': 'css/dev/blocks/**/*.sass',
          'css/import/_resets.sass': 'css/dev/_resets.sass',
        },
        options: {
          useSingleQuotes: false,
          signature: '// This file is auto-generated from framaework by grunt'
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
    watch: {
      css: {
        files: '**/*.sass',
        tasks: ['sass','sass_globbing', 'cssmin']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass','sass_globbing','cssmin','watch']);
}
