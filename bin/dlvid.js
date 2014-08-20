#!/usr/bin/env node

var docopt = require('docopt').docopt,
  fs = require('fs'),
  ProgressBar = require('progress-bar'),
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
  var bar = ProgressBar.create(process.stdout);
  bar.format = '$bar; $percentage;% Downloaded.';
  var complete = argv['<url>'].length;
  var progress = 0;
  bar.update(0);
  var out = argv['--directory']+argv['--prefix']+'-'+argv['--output']+'-';
  argv['<url>'].forEach(function(url, index, urls) {
    workers.download(url, out, function(err) {
      if (err) {
        console.error(err);
      }
      progress++;
      bar.update(progress /  complete);
      if (progress === urls.length) {
        console.log();
        workerFarm.end(workers.download);
      }
    });
  });
}

if (argv.info) {
  var progress = 0;
  argv['<url>'].forEach(function(url, index, urls) {
    workers.info(url, function(err, data) {
      if (err) {
        console.error(err);
      }
      console.log(data);
      progress++;
      if (progress === urls.length) {
        workerFarm.end(workers.info);
      }
    });
  });
}