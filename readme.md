# vbb-graph-computation-server

**A web service to queue VBB transit map computations.** An HTTP frontend to a persistent queue of computations, each producing an export file and a log.

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

Push a job containing data to the queue:

```shell
curl -X POST 'http://localhost:3000/' -H 'Content-Type: application/json' --data '{"some": "data"}'
# {"error": false, "jobId": 1534625442860343, "msg": "job 1534625442860343 created."}
```

The worker in [`worker.js`](lib/worker.js) will, once it iterates over the `1534625442860343` job, create two files:

- `export` – the worker's `stdout` – is the computed data.
- `log` – the worker's `stderr` – contains log messages.

You can query the status of a job like this:

```shell
curl -X GET 'http://localhost:3000/1534625635081071'
# {"error": false, "jobId": "1534625635081071", "msg": "job 1534625635081071 is running.", "payload": "{\"foo\":\"bar\"}"}
```

Once the job is done, you can query the export file and log:

```
curl -X GET 'http://localhost:3000/1534625635081071/export'
curl -X GET 'http://localhost:3000/1534625635081071/log'
```


## running the service

```shell
env PASSWORD=passwordToQueueTasks node index.js
```

You may want to monitor the web service using [forever](https://github.com/foreverjs/forever#readme).


## Contributing

If you have a question or have difficulties using `vbb-graph-computation-server`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/vbb-graph-computation-server/issues).
