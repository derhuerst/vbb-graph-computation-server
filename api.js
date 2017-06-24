'use strict'

const express = require('express')
const hsts = require('hsts')
const corser = require('corser')
const compression = require('compression')
const nocache = require('nocache')
// const path = require('path')
// const serve = require('serve-static')

const status = require('./lib/status')
const create = require('./lib/create')

const api = express()
module.exports = api

api.use(hsts({maxAge: 24 * 60 * 60 * 1000}))
const allowed = corser.simpleRequestHeaders.concat(['User-Agent', 'X-Identifier'])
api.use(corser.create({requestHeaders: allowed})) // CORS
api.use(compression())

// const logosDir = path.dirname(require.resolve('vbb-logos/package.json'))
// api.use('/logos', serve(logosDir, {index: false}))

// todo: password protection
const noCache = nocache()
// api.get('/:id/result', todo)
api.get('/:id', noCache, status)
api.post('/', noCache, create)

api.use((err, req, res, next) => {
	if (res.headersSent) return next()
	res.status(err.statusCode || 500).json({error: true, msg: err.message})
	next()
})
