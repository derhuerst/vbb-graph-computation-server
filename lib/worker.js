'use strict'

const path = require('path')
const mkdirp = require('mkdirp')
const proc = require('child_process')
const escape = require('shell-escape-tag').default

const dir = process.env.dir
const root = dir ? path.resolve(process.cwd(), dir) : path.join(__dirname, '..')

const timeout = parseInt(process.env.TIMEOUT) || 100 * 1000
if (Number.isNaN(timeout)) {
	console.error('TIMEOUT env var must be a number.')
	process.exit(1)
}

const executable = path.join(__dirname, '../demo-worker.js') // todo

const worker = (id, payload, cb) => {
	const cwd = path.join(root, id)
	const nodes = path.join(cwd, 'nodes.ndjson')
	const edges = path.join(cwd, 'edges.ndjson')
	const stdout = path.join(cwd, 'export')
	const stderr = path.join(cwd, 'log')

	// todo: other params for TransitmapSolver.jl, take from payload
	const cmd = escape `${executable} >${stdout} 2>${stderr} ${nodes} ${edges}`

	mkdirp(cwd, (err) => {
		if (err) return cb(err)

		proc.exec(cmd, {timeout, cwd}, cb)
	})
}

module.exports = worker
