const express = require('express')
const sql = require('mssql')

const router = express.Router()

router.get('/server/status', (req, res) => {
  res.json({ server: 'MAIN SERVER', success: true, date: Date.now() })
})

router.get('/user', (req, res) => {
  const sqlReq = new sql.Request()
  sqlReq.query('select * from users')
    .then(data => res.json(data) )
    .catch(err => res.status(500).send(err) )
})

module.exports = router
