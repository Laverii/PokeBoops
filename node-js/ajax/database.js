'use strict'


const express = require('express')
var app = express()
const pg = require('pg')
const serverString = 'postgres://postgres:password@localhost:21023/node_hero'
app.post('/users', function (req, res, next) {  
  const user = req.body

  pg.connect(serverString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.send(200)
    })
  })
})

console.log("is it reaching?")
