'use strict'

const path = require('path')
const fs = require('fs')
const send = require('send')

const dir = process.env.dir
const root = dir ? path.resolve(process.cwd(), dir) : path.join(__dirname, '..')

const serveFile = (file) => {
	const route = (req, res, next) => {
		const dir = path.join(root, req.params.id)

		fs.stat(dir, (err) => {
			if (err) {
				if (err.code === 'ENOENT') return next(err404('job not found.'))
				err.statusCode = 500
				return next(err)
			}

			send(req, '/' + file, {root: dir}).pipe(res)
		})
	}
	return route
}

module.exports = serveFile
