'use strict'

const path = require('path')
const level = require('level')

const dir = process.env.DIR || path.join(__dirname, '..')

const db = level(path.join(dir, 'jobs.leveldb'))

module.exports = db
