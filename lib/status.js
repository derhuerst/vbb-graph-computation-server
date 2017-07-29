'use strict'

const queue = require('./queue')
const db = require('./db')

const {err404} = require('./util')

const findJob = (stream, id) => {
	return new Promise((resolve, reject) => {
		stream.once('error', reject)
		stream.on('data', (data) => {
			if (data.key === id) resolve(data)
		})
		stream.once('end', () => resolve(null))
	})
}

const status = (req, res, next) => {
	const jobId = req.params.id
	let found = false

	findJob(queue.runningStream(), jobId)
	.then((runningJob) => {
		if (runningJob) {
			res.json({
				error: false,
				jobId,
				running: true,
				msg: `job ${jobId} is running.`,
				payload: runningJob.value
			})
			next()
		} else return findJob(queue.pendingStream(), jobId)
	})
	.then((pendingJob) => {
		if (pendingJob) {
			res.json({
				error: false,
				jobId,
				running: false,
				msg: `job ${jobId} is queued.`,
				payload: pendingJob.value
			})
			next()
		} else throw err404('could not find this job.')
	})
	.catch(next)
}

module.exports = status
