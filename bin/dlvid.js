#!/usr/bin/env node

var docopt = require('docopt').docopt,
  fs = require('fs'),
  workerFarm = require('worker-farm'),
  workers = {
    download: workerFarm(require.resolve('../lib/workers/lib/download')),
    info: workerFarm(require.resolve('../lib/workers/lib/info'))
  },
  helpText = fs.readFileSync(__dirname + '/../lib/help.txt').toString(),
  package = require('../package.json'),
  argv = docopt(helpText);


if (argv['--version']) {
  console.log('DLVid. Download videos from websites.');
  console.log('(c) 2014 by Michael Price, MIT License');
  console.log(package.version);
  process.exit(0);
}


if (argv.download) {
  argv['<url>'].forEach(function(url, index, urls) {
    workers.download(url, null, function(err, data) {
      if (err) {
        console.error(err);
        return;
      }
      if (index + 1 === urls.length) {
        workerFarm.end(workers.download);
      }
    });
  });
}

if (argv.info) {
  
}