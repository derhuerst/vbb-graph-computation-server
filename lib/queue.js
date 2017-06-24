'use strict'

const path = require('path')
const level = require('level')
const createQueue = require('level-jobs')

const worker = require('./worker')

const dir = process.env.DIR || path.join(__dirname, '..')
const concurrency = 1

const db = level(path.join(dir, 'jobs.leveldb'))
const queue = createQueue(db, worker, {
	maxConcurrency: concurrency,
	maxRetries: 1
})

queue.on('drain', () => console.info('drain'))
queue.on('error', (err) => console.info('error', err))
queue.on('retry', () => console.info('retry'))

module.exports = queue
