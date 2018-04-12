const Post = require('../models/post')

exports.create = function (req, res) {
    const post = new Post()

    post.title = req.body.title
    post.author = req.body.author
    post.content = req.body.content

    post.save(function (err) {
        if (err) {
            res.send(err)
        }
        res.json({ message: 'post created!' })
    })

}

exports.list = function (req, res) {
    Post.find(function (err, post) {
        if (err) {
            res.send(err)
        }
        res.json(post)
    })
}

exports.show = function (req, res) {
    Post.findById(req.params.post_id, function (err, post) {
        if (err) {
            res.send(err)
        }
        res.json(post)
    })
}

exports.update = function (req, res) {
    Post.findById(req.params.post_id, function (err, post) {
        if (err) {
            res.send(err)
        }

        post.title = req.body.title
        post.author = req.body.author
        post.content = req.body.content
        post.updatedAt = Date.now()
    

        post.save(function (err) {
            if (err) {
                res.send(err)
            }
            res.json({ message: 'toDo update!' })
        })
    })
}

exports.delete = function (req, res) {
    Post.remove({
        _id: req.params.post_id
    }, function (err, post) {
        if (err) {
            res.send(post)
        }
        res.json({ message: 'Succesfully deleted' })
    })
}