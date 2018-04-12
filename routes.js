const express = require('express')
const { check } = require('express-validator/check')

const UserController = require('./controllers/user')
const PostController = require('./controllers/post')

const router = express.Router()

const registerValidator = [
    check('email')
        .isEmail().withMessage('must be an email')
        .trim()
        .normalizeEmail(),

    check('password', 'passwords must be at least 5 chars long and contain one number')
        .isLength({ min: 5 })
        .matches(/\d/),
]

/** 
 * Welcome path endpoint
 */
router.get('/', (req, res) => {
    res.json({ message: 'hooray! API-nya masuk!!' })
})

/** 
 * Auth routes
 */
router.post('/register', registerValidator, UserController.register)
// router.post('/login', UserController.login)
// router.post('/login', UserController.logout)
router.get('/me', UserController.me)

/** 
 * Article Routes
 */
router.post('/post', PostController.create)
router.get('/post', PostController.list)
router.get('/post/:post_id', PostController.show)
router.put('/post/:post_id', PostController.update)
router.delete('/post/:post_id', PostController.delete)

module.exports = router
