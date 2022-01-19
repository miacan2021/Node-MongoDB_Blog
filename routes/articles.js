const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment.controller')
const likeController = require('../controllers/like.controller')
const crudController = require('../controllers/crud.controller')

router.get('/new', crudController.getNew)

router.get('/edit/:id', crudController.getEdit)

router.get('/:id', crudController.getMorePage)

router.post('/', crudController.postArticle)

router.post('/edit/:id', crudController.postEditArticle)

router.post('/delete/:id', crudController.postDeleteArticle)

router.post('/like/:id', likeController.addLike)

router.post('/dislike/:id', likeController.addDislike)

router.post('/comment/:id', commentController.postComment)
 


module.exports = router