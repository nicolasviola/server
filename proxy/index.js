const express = require('express')
const bodyParser = require('body-parser')
const proxy = require('./routes')
const middlewares = require('../middlewares')

const port = process.env.PORT || 4000
const app = express()

app
  .use(middlewares.cors)
  .use(bodyParser.json())
  .use('/api', proxy)
  .listen(port, err => {
    if (err) console.error(err)
    else console.info('==> 🌎  Listening on port '+port+'. Open up http://localhost:'+port+'/ in your browser.')
  })
