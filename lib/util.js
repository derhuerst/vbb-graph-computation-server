'use strict'

const path = require('path')
const fs = require('fs')

const dir = process.env.dir
const rootDir = dir ? path.resolve(process.cwd(), dir) : path.join(__dirname, '..')

const err400 = (msg) => {
	const err = new Error(msg)
	err.statusCode = 400
	return err
}

const err404 = (msg) => {
	const err = new Error(msg)
	err.statusCode = 404
	return err
}

const hasJob = (id, cb) => {
	fs.stat(path.join(rootDir, id), (err) => {
		if (err && err.code === 'ENOENT') cb(null, false)
		else if (err) cb(err)
		else cb(null, true)
	})
}

module.exports = {rootDir, err400, err404, hasJob}
