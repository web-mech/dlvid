var expect = require('chai').expect;
var App = require('../lib/dlvid');
var dlvid = require('dlvid-core');
var Stream = require('stream');

describe('DLVid', function() {
  describe('identify', function() {
    it('Should return the parsed host name when passed any valid url', function() {
      var url = 'http://yahoo.com';
      var app = new App(url);
      expect(app.identify(url)).to.equal('yahoo');
    });

    it('Should return false when given an invalid url', function() {
      var url = 'www.yahoo.com';
      var app = new App('http://youtube.com');
      expect(app.identify(url)).to.equal(false);
    });
  });

  describe('init', function() {
    it('Returns an error when initialized with an unknown provider', function() {
      function fn() {
        try {
          new App('http://notaprovider.com');
        } catch (e) {
          throw new Error(e.message);
        }
      }
      expect(fn).to.throw(Error);
    });

    it('Returns the found extractor when passed a known provider', function() {
      var app = new App('http://yahoo.com');
      expect(app.provider).to.eql(dlvid.Yahoo);
    });
  });

  describe('info', function() {
    it('Returns info about a clip using dlvid-core', function(done) {
      var app = new App('http://www.youtube.com/watch?v=eAgLqGBaBtY');
      app.info().done(function(data) {
        expect(data).to.have.ownProperty('view_count');
        done();
      });
    });
  });

  describe('download', function() {
    it('Returns a valid file stream using dlvid-core', function(done) {
      var app = new App('http://www.vevo.com/watch/USCMV1100094');
      app.download().done(function(file) {
        expect(file).to.be.an.instanceof(Stream);
        done();
      });
    });
  });
});