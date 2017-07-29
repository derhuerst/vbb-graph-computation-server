'use strict'

const fs = require('fs')
const path = require('path')

const {rootDir, hasJob, err400, err404} = require('./util')

const upload = (file) => {
	const route = (req, res, next) => {
		const jobId = req.params.id
		if (req.get('content-type') !== 'application/x-ndjson') {
			return next(err400('only ndjson allowed.'))
		}

		hasJob(jobId, (err, jobExists) => {
			if (err) {
				err.statusCode = 500
				return next(err)
			}
			if (!jobExists) return next(err404('job not found.'))

			const dest = path.join(rootDir, jobId, file)
			const onFinish = () => {
				// todo: 201 vs 200
				res.status(201).json({
					error: false,
					jobId,
					msg: `${file} created for job ${jobId}.`
				})
			}

			req
			.once('error', next)
			.pipe(fs.createWriteStream(dest))
			.once('error', next)
			.once('finish', onFinish)
		})
	}
	return route
}

module.exports = upload
