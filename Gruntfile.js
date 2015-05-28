module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/library/css/screen.css': 'public/library/sass/screen.scss'
        }
      }
    },
    express: {
      options: {
        // Override defaults here
        port: 3000
      },
      dev: {
        options: {
          script: 'index.js'
        }
      }
    },
    watch: {
      files: ['public/library/sass/**/*.scss'],
      tasks: ['sass']
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['sass', 'express:dev', 'watch']);
}
