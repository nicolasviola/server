const express = require('express')
const bodyParser = require('body-parser')
const sql = require('mssql')
const api = require('./routes')
const middlewares = require('../middlewares')

const port = process.env.PORT || 5000
const app = express()

const sqlConfig = {
  user: 'remotetest',
  password: '123',
  server: '192.168.43.249',
  port: 14330,
  database: 'alztest',
  options: { encrypt: false }
}

//sql.connect('mssql://remotetest:123@192.168.0.17/alztest')
sql.connect(sqlConfig)
  .then(() => { console.log('mssql connected') })
  .catch(err => { console.log('catch', err) })


app
  .use(middlewares.cors)
  .use(bodyParser.json())
  .use('/api', api)
  .listen(port, err => {
    if (err) console.error(err)
    else console.info('==> 🌎  Listening on port '+port+'. Open up http://localhost:'+port+'/ in your browser.')
  })
