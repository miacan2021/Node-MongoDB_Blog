const express = require('express')
const Article = require('../models/articles')
const router = express.Router()

router.get('/new', (req, res)=>{
    res.render('articles/new',{article: new Article()})
})

router.get('/:id', async(req, res) => {
    const article = await Article.findById(req.params.id)
    if(article === null) res.redirect('/')
    res.render('articles/show', {article})
})

router.post('/', async (req, res) => {
   let article = new Article({
       title: req.body.title,
       content: req.body.content
   })
   console.log('body:', req.body)
   try{
       article = await article.save()
       res.redirect(`/articles/${article.id}`)
   }catch(e){
        console.log(e)
        res.render('articles/new', {article})
   }
})

router.post('/delete/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router