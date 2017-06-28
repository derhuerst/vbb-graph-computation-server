'use strict'

const createQueue = require('level-jobs')

const db = require('./db')
const worker = require('./worker')

const queue = createQueue(db, worker, {
	maxConcurrency: 1,
	maxRetries: 1
})

queue.on('drain', () => console.info('drain'))
queue.on('error', (err) => console.info('error', err))
queue.on('retry', () => console.info('retry'))

module.exports = queue
