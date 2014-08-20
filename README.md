#DLVid 

[![Build Status](https://travis-ci.org/web-mech/dlvid.png?branch=master)](https://travis-ci.org/web-mech/dlvid)

(Ver. 0.8.0)

DLVid is a cli tool for downloading web clips (similar to youtube-dl).


##Installation
```
npm install -g dlvid
```

##Usage

###Downloading
```
dlvid download <url>...
```
#####Supported Providers

See the current list [here](https://github.com/web-mech/dlvid-core/blob/master/support.md)

###Information
```
dlvid info <url>... >> test.json
```

###Testing

```
npm test
```
