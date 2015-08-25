function init(){
  global.$(global.window.document).ready(function(){
    var exports = require("./../js/export.js");

    var fs = require('fs');
    var path = require('path');
    var http = require('http');
    var ext;

    exports.chooseFile("#openFileDialog", function(filename){
      var username = 'martinrusev';
      var passphrase = 'test';

      ext = path.extname(filename)

      $('#textarea').val('');
      $("#response").empty();

      fs.readFile(filename, function (err, data) {
        if (err) {
          $("#response").append('<div>error: '+err+'</div>');
          return console.log(err);
        }

        var base64File = new Buffer(data,'base64');
        fileUpload(username, passphrase, 'test', base64File);

      });
    });

    actions = {};
    crypton.host = 'testapiservice.crypton.io';
    crypton.port = 443;

    function fileUpload(user, pass, fileName, fileData) {

      crypton.authorize(user, pass, function (err, session) {
        if (err) {
          $("#response").append('<div>error: '+err+'</div>');
          return console.error(err);
        }
        app.session = session;
        app.session.getOrCreateItem(fileName, function (err, item) {

          if (err) {
            $("#response").append('<div>error: '+err+'</div>');
            return console.error(err);
          }

          app.myitem = item;
          app.session.items[fileName].value.name = user;
          app.session.items[fileName].value.fileData = fileData;
          app.session.items[fileName].save(function (err) {
            if (err) {
              $("#response").append('<div>error: '+err+'</div>');
              console.log(err);
            }
            console.log('file saved!');
            getItem(fileName);
          });
        });
      });
    }

    function getItem(name) {
      app.session.getOrCreateItem(name, function callback(err, name) {
        if (err) {
          console.log(err);
          $("#response").append('<div>error: '+err+'</div>');
        }

        var bitmap = new Buffer(name._value.fileData, 'base64');
        fs.writeFile('test'+ext, bitmap);

        var filename = 'test'+ext;
        $("#response").append('<div>download: <a href="../'+filename+'" download="'+filename+'" id="link">'+filename+'</a></div>');

        $('#textarea').val(bitmap);
      });
    }


    var app = {
      session: null
    };


  });
}
