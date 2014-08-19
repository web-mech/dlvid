var Class = require('ee-class'),
  extractors = require('dlvid-core'),
  providers = Object.keys(extractors).map(function(i) {
    return i.toLowerCase();
  }),
  Url = require('url');

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var DLVid = new Class({
  provider: null,
  url: null,
  init: function(url) {
    var provider = this.identify(url);
    if (!~providers.indexOf(provider)) {
      throw new Error('Invalid provider');
    }
    this.provider = extractors[capitaliseFirstLetter(provider)];
    this.url = url;
  },
  identify: function(url) {
    var urlParts = Url.parse(url);
    if (!urlParts.host) {
      return false;
    }
    var h = urlParts.host.split('.');
    return h.slice(-2)[0];
  },
  info: function() {
    return this.provider.info(this.url);
  },
  download: function() {
    return this.provider.download(this.url);
  }
});

module.exports = DLVid;