'use strict'

const proc = require('process')
const path = require('path')
const child = require('child_process')

const root = path.resolve(proc.cwd(), proc.env.DIR) || path.join(__dirname, '..')

const timeout = parseInt(proc.env.TIMEOUT) || 100 * 1000
if (Number.isNaN(timeout)) {
	console.error('TIMEOUT env var must be a number.')
	proc.exit(1)
}

const executable = path.join(__dirname, '../demo-worker.js') // todo

const worker = ({dir, payload}, cb) => {
	const cwd = path.join(root, dir)
	const stdout = path.join(cwd, 'export')
	const stderr = path.join(cwd, 'log')
	// todo: pass options as argv
	// see also https://github.com/npm/npm/blob/ef0dd74/lib/utils/escape-arg.js

	child.exec(`${executable} >${stdout} 2>${stderr}`, {timeout, cwd}, cb)
}

module.exports = worker
