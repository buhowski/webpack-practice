const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/*', function(req, res) {
  res.sendFile(path.join('public', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})