module.exports = function (grunt) {
  'use strict';

  var paths = grunt.config.get('paths'),
    pkg = grunt.config.get('pkg');

  grunt.config.merge({
    clean: {
      'Linux64_v0.12.0': {
        files: [{
          dot: true,
          src: ['<%= paths.dist %>/Linux64_v0.12.0/*']
        }]
      }
    },
    copy: {
      'Linux64_v0.12.0': {
        options: {
          mode: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= paths.nwjsSource %>/nwjs-v0.12.0-linux-x64',
            dest: '<%= paths.dist %>/Linux64_v0.12.0',
            src: 'nw.pak'
          },
          {
            expand: true,
            cwd: '<%= paths.nwjsSource %>/nwjs-v0.12.0-linux-x64',
            dest: '<%= paths.dist %>/Linux64_v0.12.0',
            src: 'nw'
          },
          {
            expand: true,
            cwd: '<%= paths.nwjsSource %>/nwjs-v0.12.0-linux-x64',
            dest: '<%= paths.dist %>/Linux64_v0.12.0',
            src: 'nw.dat'
          },
          {
            expand: true,
            cwd: '<%= paths.nwjsSource %>/nwjs-v0.12.0-linux-x64',
            dest: '<%= paths.dist %>/Linux64_v0.12.0',
            src: 'icudtl.dat'
          },
          {
            expand: true,
            cwd: '<%= paths.app %>',
            dest: '<%= paths.dist %>/Linux64_v0.12.0/app.nw',
            src: '**'
          }
        ]
      }
    }
  });

  grunt.registerTask('Linux64_v0.12.0', function(){
    grunt.task.run([
      'clean:Linux64_v0.12.0',
      'copy:Linux64_v0.12.0'
    ]);
  });

};
