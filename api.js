'use strict'

const express = require('express')
const hsts = require('hsts')
const corser = require('corser')
const compression = require('compression')
const nocache = require('nocache')

const create = require('./lib/create')
const status = require('./lib/status')
const serveFile = require('./lib/serve-file')

const api = express()
module.exports = api

api.use(hsts({maxAge: 24 * 60 * 60 * 1000}))
const allowed = corser.simpleRequestHeaders.concat(['User-Agent', 'X-Identifier'])
api.use(corser.create({requestHeaders: allowed})) // CORS
api.use(compression())

const noCache = nocache()
// todo: password protection

api.post('/', noCache, create)
api.get('/:id', noCache, status)
api.get('/:id/export', noCache, serveFile('export'))
api.get('/:id/log', noCache, serveFile('log'))

api.use((err, req, res, next) => {
	if (res.headersSent) return next()
	res.status(err.statusCode || 500).json({error: true, msg: err.message})
	next()
})
