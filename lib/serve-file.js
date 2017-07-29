'use strict'

const path = require('path')
const fs = require('fs')
const send = require('send')

const {rootDir, hasJob, err404} = require('./util')

const serveFile = (file) => {
	const route = (req, res, next) => {
		const dir = path.join(rootDir, req.params.id)

		hasJob(req.params.id, (err, jobExists) => {
			if (err) {
				err.statusCode = 500
				return next(err)
			}
			if (!jobExists) return next(err404('job not found.'))

			send(req, '/' + file, {root: dir}).pipe(res)
		})
	}
	return route
}

module.exports = serveFile
