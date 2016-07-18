// Gruntfile.js
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-http-upload');
  // grunt.loadNpmTasks('grunt-contrib-less');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-watch');

  // Minification cant happen.... what about creating zip?

  grunt.initConfig({
    concat: {
      options: {
        banner: '/*! Built @ <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
      },
      dist: {
        src: [
          'min/_01.js',
          // 'min/_02.js'
        ],
        dest: 'dist/colorPicker.js'
      },
      debug: {
        src: [
          // 'js/index.js',
          'js/colorPickerModule.js'
        ],
        dest: 'dist/colorPicker.js'
      }
    },
    uglify: {
      options: {
        // banner: '/*! Minification Built @ <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
        mangle: false
      },
      target: {
        files: {
          // 'min/_01.js': ['js/index.js'],
          'min/_01.js': ['js/colorPickerModule.js']
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: '../colormanager.zip'
          // TODO: move this to a different folder.
        },
        files: [
          {cwd: 'templates/', src : ['*'], dest:'/colormanager/', filter:'isFile', expand: true },
          {cwd: 'dist/', src : ['*'], dest:'/colormanager/', filter:'isFile', expand: true }
        ]
        // FIXME:
      }
    },
    clean: {
      main: {
        src: ['min', 'dist']
      }
    },
    // http_upload: {
    //   target: {
    //     options: {
    //       url: 'http://localhost:3000/upload',
    //       method: 'POST',
    //       rejectUnauthorized: false,
    //       headers: {
    //         // 'Authorization': 'Token <%= your_token_here %>'
    //       },
    //       data: {
    //         // someKey: 'some value'
    //       },
    //       onComplete: function(data) {
    //           console.log('Response: ' + data);
    //       }
    //     },
    //     src: '../colormanager.zip',
    //     dest: 'myField'
    //   },
    // }
  });

  grunt.registerTask('default', ['uglify', 'concat:dist', 'compress','clean']);

  grunt.registerTask('debug', ['concat:debug', 'compress', 'clean']);


  // grunt.registerTask('debug', []);
  // FIXME: allow debug that doesn't uglify.

  // TODO: remove temp files?

  // TODO: add version numbering? or git commit?

};
