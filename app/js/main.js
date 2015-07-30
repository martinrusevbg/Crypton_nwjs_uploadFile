function init(){
  global.$(global.window.document).ready(function(){
    var exports = require("./../js/export.js");

    exports.chooseFile("#openFileDialog", function(filename){
      var action = 'authorize';
      var username = 'martinrusev';
      var passphrase = 'test';

      var fs = require('fs');
      fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }

        var base64File = new Buffer(data, 'binary').toString('base64');
        actions[action](username, passphrase, base64File.toString(), 'crypt');

        setTimeout(function(){
          getItem('crypt');
        }, 10000);
      });
    });
  });
}


actions = {};
crypton.host = 'testapiservice.crypton.io';
crypton.port = 443;

actions.authorize = function (username, passphrase, file, name) {
  setStatus('authorizing...');

  crypton.authorize(username, passphrase, function (err, session) {
    if (err) {
      setStatus(err);
      return;
    }

    app.session = session;
    setStatus('logged in');

    getOrCreate(name, file);
  });
}

actions.register = function (username, passphrase, callback) {
  setStatus('generating account...');

  crypton.generateAccount(username, passphrase, function (err, account) {
    if (err) {
      setStatus(err);
      return;
    }

    setStatus('account generated');
    actions.authorize(username, passphrase);
  });
}

function setStatus (status) {
  console.log(status);
}

function getOrCreate(name, file) {
  app.session.getOrCreateItem(name, function _callback(err, item) {
    if (err) {
      console.error(err);
    }
    console.log(item)
    updateItem(name, file);
  });
}

function updateItem(name, value) {
  if (!app.session.items[name]) {
    console.log('Item not found');
    return;
  }

  var item = app.session.items[name];
  item.value.name = value;

  item.save(function callback(err) {
    if (err) {
      console.error(err);
    }
  });
}

function getItem(name) {
  app.session.getOrCreateItem(name, function callback(err, name) {
    if (err) {
      console.log(err);
    }
    console.log(name);
  });
}

var app = {
  session: null
};
