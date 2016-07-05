
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    // used by the changelog task
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        updateConfigs: ['pkg'],
        // commit CHANGELOG.md as well
        commitFiles: ['package.json', 'CHANGELOG.md'],
        commit: true,
        createTag: true,
        push: false
      }
    },

    conventionalChangelog: {
      options: {
        changelogOpts: {
          // conventional-changelog options go here 
          preset: 'angular'
        },
      },
      release: {
        src: 'CHANGELOG.md'
      }
    }, 

    jshint: {
      options: {
        esversion: 6
      },
      debug: [
        'test/**/*.js',
        'Gruntfile.js',
        'app.js',
      ]
    },

    tape: {
      files: ['test/**/*.js'],
    },

    spawn: {
      changelog: {
        command: 'vim',
        directory: "./",
        passThrough: true,
        commandArgs: ['CHANGELOG.md'],
        opts: {
          stdio: 'inherit'
        }
      }
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
  grunt.loadNpmTasks('grunt-spawn');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-conventional-changelog');

  grunt.registerTask('default', ['jshint:debug']);
  grunt.registerTask('test', ['jshint', 'tape', 'bump']);
  grunt.registerTask('notes', ['bump-only', 'conventionalChangelog', 'spawn:changelog', 'bump-commit']);
};
