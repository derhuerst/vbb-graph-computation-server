'use strict'

const queue = require('./queue')
const db = require('./db')

const err404 = (msg) => {
	const err = new Error(msg)
	err.statusCode = 404
	return err
}

const status = (req, res, next) => {
	const jobId = req.params.id
	let found = false

	db.createReadStream()
	.on('error', next)
	.on('data', (entry) => {
		// ugly hack, see https://github.com/pgte/level-jobs/issues/22
		const id = entry.key.split('!').pop()
		if (id !== jobId) return

		found = true
		res.json({
			error: false,
			jobId,
			msg: `job ${jobId} is running.`,
			payload: entry.value
		})
		next()
	})
	.on('end', () => {
		if (!found) next(err404('could not find this job.'))
	})
}

module.exports = status
