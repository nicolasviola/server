const request = require('request')
const express = require('express')

const router = express.Router()
const proxyURL = process.env.PROXY_URL || 'http://localhost:5000'

router.get('/server/status', (req, res) => {
  res.json({ server: 'PROXY SERVER', success: true, date: Date.now() })
})

router.get('*', (req, res) => {
  const url = proxyURL + '/api' + req.url
  console.log('HTTP GET: '+url)
  request({ url: url }, (err, response, body) => {
    if(err || body && body.error) {
      err ?
        res.status(err.code).send(err) :
        res.status(body.error.code).send(body.error)
    } else {
      try {
        res.json(JSON.parse(body))
      } catch (err) {
        res.status(500).send(body)
      }
    }
  })
})

router.post('*', (req, res) => {
  const url = proxyURL + '/api'  + req.url
  console.log('HTTP POST: '+url)
  // request.post({ url: url, formData: req.body, json: false },
  request.post({ url: url, body: req.body, json: true },
    (err, response, body) => {
      if(err || body && body.error) {
        res.status(body.error.code).send(body.error)
      } else {
        try {
          res.json(body)
        } catch (err) {
          res.status(500).send(body)
        }
      }
    }
  )
})

module.exports = router
