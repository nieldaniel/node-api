const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')


const config = require('../config')
const User = require('../models/user')
const errorFormatter = require('../helpers/errorFormater')

exports.register = function (req, res) {
    const errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() })
    }

    const data = matchedData(req)


    const hashedPassword = bcrypt.hashSync(data.password, 8)

    User.find({ email: data.email }, (err, user) => {
        if (user.email) {
            return res.json({ message: 'Email has been registered.' })
        }
        
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        },
            function (err, user) {
                if (err) {
                    return res.status(500).send("There was a problem registering the user.")
                }

                //create token
                const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 } // expires in 24 hours
                )

                res.status(200).send({ auth: true, token: token })
            })
    })

}

exports.me = function (req, res) {
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' })
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
        }
        
        res.status(200).send(decoded)
    })
}