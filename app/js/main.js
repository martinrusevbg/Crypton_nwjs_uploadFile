function init(){
  global.$(global.window.document).ready(function(){
    var exports = require("./../js/export.js");

    var fs = require('fs');
    var path = require('path');
    var http = require('http');

    exports.chooseFile("#openFileDialog", function(filename){
      var username = 'martinrusev';
      var passphrase = 'test';

      fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }

        var base64File = new Buffer(data).toString('base64');
        testFileUpload(username, passphrase, 'test', base64File);

      });
    });

    actions = {};
    crypton.host = 'testapiservice.crypton.io';
    crypton.port = 443;

    function testFileUpload(user, pass, fileName, fileData) {

      crypton.authorize(user, pass, function (err, session) {
        if (err) {
          return console.error(err);
        }
        app.session = session;
        app.session.getOrCreateItem(fileName, function (err, item) {

          if (err) {
            return console.error(err);
          }

          app.myitem = item;
          app.session.items[fileName].value.name = user;
          app.session.items[fileName].value.fileData = fileData;
          app.session.items[fileName].save(function (err) {
            if (err) {
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
        }
        console.log(name);
        var bitmap = new Buffer(name._value.fileData, 'base64');
        var file = fs.writeFile('test.txt', bitmap);
        $('#response').val(bitmap);
      });
    }

    var app = {
      session: null
    };

  });
}


