const express = require('express')
const bodyParser = require('body-parser')
const mongoose   = require('mongoose');
const toDoModel = require('./models/toDo')

const app = express()

// CONNECT DB
mongoose.connect('mongodb://localhost:27017/node-rest-api');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

const port = process.env.PORT || 8080

const router = express.Router()

router.get('/', function(req, res){
    res.json({message: 'hooray! API-nya masuk!!'})
})

router.route('/todo')
    .post(function(req, res){
        const toDo = new toDoModel()

        toDo.name = req.body.name
        toDo.completed = req.body.completed

        toDo.save(function(err){
            if (err) {
                res.send(err)
            }
            res.json({message: 'toDo created!'})
        })

    })

    .get(function(req, res){
        toDoModel.find(function(err, todo){
            if (err) {
                res.send(err)
            }
            res.json(todo)
        })
    })

app.use('/api', router)

app.listen(port)
console.log('Magic happens on port ' + port);

//test

/* const express = require('express')

const app = express()

const router = express.Router()
router.get('/', function(req, res){
    res.json({
        name: 'Daniel',
        age: 22,
        address: 'Karbela'
    })
})

app.use(router)

app.listen(3000, function(err) {
    if (err) {
        console.log('Ada error tuh')
    }

    console.log("My app started at http://localhost:3000")
}) */
