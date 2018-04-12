const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')
const apiRoutes = require('./routes')

const app = express()

// CONNECT DB
mongoose.connect(config.dbURL);

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use('/api', apiRoutes)

app.listen(config.port, () => {
    console.log('Magic happens on http://localhost:' + config.port);
})
