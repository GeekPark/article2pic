module.exports = function(grunt) {
  grunt.initConfig({
    uglify:{
      dist: {
        options: {
          beautify: true,
          compress: false
        },
        files: {
          'dist/main.min.js': [
            'src/js/jquery.min.js',
            'src/js/html2canvas.min.js',
            'src/js/common.js',
            'src/js/main.js',
            'src/js/option.js'
          ]
        }
      }
    },
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'dist/option.css': 'src/css/option.scss'
        }
      }
    },
    clean: {
      options: { force: true },
      stuff: ["../article2pic/", "../*.crx", "../*.pem"]
    },
    copy: {
      deploy: {
        files: [
          // includes files within path
          {expand: true, src: [
            'dist/**',
            'icon.png',
            'manifest.json',
            '*.html'
          ], dest: '../article2pic/'}
        ],
      },
    },
    watch:{
      js:{
        files: 'src/js/*.js',
        tasks:['uglify']
      },
      sass: {
        files: 'src/css/*.scss',
        tasks:['sass']
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'sass', 'watch']);
  grunt.registerTask('deploy', ['uglify', 'sass', 'clean', 'copy:deploy']);
};
