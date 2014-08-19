var App = require('../../dlvid'),
  async = require('async'),
  fs = require('fs');

module.exports = function(url, out, cb) {
  try {
    var app = new App(url);

    function info(cb) {
      app.info().done(function(info) {
        cb(null, info);
      });
    }

    function download(cb) {
      app.download().done(function(file) {
        cb(null, file);
      });
    }
    async.parallel([info, download], function(err, result) {
      if (err) {
        return cb(err);
      }
      var name = out || Date.now() + '.mp4',
        file = fs.createWriteStream(name);
      file.on('finish', function() {
        cb(null, result[0]);
      });
      result[1].pipe(file);
    });
  } catch (e) {
    cb(e);
  }
};