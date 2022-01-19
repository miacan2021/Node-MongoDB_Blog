const express = require('express')
const Article = require('../models/articles')
const router = express.Router()


router.post('/articles/like', async(req, res) => {
    const article = await Article.findById(req.params.id)
    article.like ++
    try{
        article = await article.save()
    }catch(e){
         console.log(e)
    }
})