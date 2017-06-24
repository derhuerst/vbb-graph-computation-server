'use strict'

const sink = require('stream-sink')
const shortid = require('shortid')
const mkdirp = require('mkdirp')

const queue = require('./queue')

const dir = process.env.DIR || path.join(__dirname, '..')

const err400 = (msg) => {
	const err = new Error(msg)
	err.statusCode = 400
	return err
}

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

		const dir = shortid.generate(10)
		mkdirp(dir, (err) => {
			if (err) {
				err.statusCode = 500
				return next(err)
			}

			const jobId = queue.push({dir, payload}, (err) => {
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
	})
}

module.exports = create
