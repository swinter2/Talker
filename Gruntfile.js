module.exports = function(grunt) {
  grunt.initConfig({
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          // require: ['compass', 'susy'],
          style: 'expanded'
        },
        // files: {                         // Dictionary of files
        //   'main.css': 'main.scss',       // 'destination': 'source'
        //   'widgets.css': 'widgets.scss'
        // }
        files: [{
          expand: true,
          cwd: 'public/library/sass',
          src: ['*.scss'],
          dest: 'public/library/css',
          ext: '.css'
        }]
      }
    },
    watch: {
      files: ['public/library/sass/**/*.scss'],
      tasks: ['sass']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
}
