'use strict'

const sink = require('stream-sink')

const queue = require('./queue')
const {err400} = require('./util')

const create = (req, res, next) => {
	req
	.on('error', next)
	.pipe(sink.object())
	.then((payload) => {
		try {
			payload = JSON.parse(payload)
		} catch (err) {
			return next(err400('post valid JSON.'))
		}

		const jobId = queue.push(payload, (err) => {
			if (err) return next(err)
			// todo: redirect
			res.status(201).json({
				error: false,
				jobId,
				msg: `job ${jobId} created.`
			})
			next()
		})
	})
}

module.exports = create
