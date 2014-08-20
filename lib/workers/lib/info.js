var App = require('../../dlvid');

module.exports = function(url, cb) {
  try {
    var app = new App(url);
    app.info().done(function(data) {
      cb(null, data);
    });
  } catch (e) {
    cb(e);
  }
};