
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    bump: {
      options: {
        commit: false,
        createTag: true,
        push: false
      }
    },
    jshint: {
      debug: [
        'test/**/*.js',
        'Gruntfile.js',
        'app.js',
      ]
    },

    tape: {
      files: ['test/**/*.js'],
    },

    watch: {
      test: {
        tasks: ['test'],
        files: ['Gruntfile.js', 'app.js', 'test/**/*.js', 'lib/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-tape');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint:debug']);
  grunt.registerTask('test', ['jshint', 'tape', 'bump']);
};
