'use strict'

const path = require('path')
const mkdirp = require('mkdirp')
const proc = require('child_process')
const escape = require('any-shell-escape')

const {rootDir} = require('./util')

const timeout = parseInt(process.env.TIMEOUT) || 100 * 1000
if (Number.isNaN(timeout)) {
	console.error('TIMEOUT env var must be a number.')
	process.exit(1)
}

const executable = path.join(__dirname, '../demo-worker.js') // todo

const worker = (id, payload, cb) => {
	const cwd = path.join(rootDir, id)
	const nodes = path.join(cwd, 'nodes.ndjson')
	const edges = path.join(cwd, 'edges.ndjson')
	const stdout = path.join(cwd, 'export')
	const stderr = path.join(cwd, 'log')

	// todo: other params for TransitmapSolver.jl, take from payload
	const cmd = [
		escape([executable]),
		'>' + escape([stdout]),
		'2>' + escape([stderr]),
		escape([nodes, edges])
	].join(' ')

	mkdirp(cwd, (err) => {
		if (err) return cb(err)

		proc.exec(cmd, {timeout, cwd}, cb)
	})
}

module.exports = worker
