# vbb-graph-computation-server

**A web service to queue [VBB transit map computations](#todo).**

[![build status](https://img.shields.io/travis/derhuerst/vbb-graph-computation-server.svg)](https://travis-ci.org/derhuerst/vbb-graph-computation-server)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-graph-computation-server.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
git clone https://github.com/derhuerst/vbb-graph-computation-server
cd vbb-graph-computation-server
npm install --production
```


## Usage

```shell
env PASSWORD=passwordToQueueTasks node index.js
```

You may want to monitor the web service using [forever](https://github.com/foreverjs/forever#readme).


## Contributing

If you have a question or have difficulties using `vbb-graph-computation-server`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/vbb-graph-computation-server/issues).
