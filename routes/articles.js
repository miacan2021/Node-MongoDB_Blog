const express = require('express')
const Article = require('../models/articles')
const router = express.Router()

router.get('/new', (req, res)=>{
    res.render('articles/new',{article: new Article()})
})

router.get('/edit/:id', async(req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article})
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
   try{
       article = await article.save()
       res.redirect(`/articles/${article.id}`)
   }catch(e){
        console.log(e)
        res.render('articles/new', {article})
   }
})


router.post('/edit/:id', async(req, res) => {
    const {title, content} = req.body
    const article = await Article.findById(req.params.id)
    article.title = title,
    article.content = content
    try{
        article = await article.save()
        res.render(`articles/show`, {article})
    }catch(e){
         console.log(e)
         res.render(`articles/show`, {article})
    }
})

router.post('/delete/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})



router.post('/like/:id', async(req, res) => {
    const article = await Article.findById(req.params.id)
    article.like += 1
    try{
        article = await article.save()
        res.render(`articles/index`, {article})
    }catch(e){
         console.log(e)
         res.redirect('/')
    }
})


router.post('/dislike/:id', async(req, res) => {
    const article = await Article.findById(req.params.id)
    article.dislike += 1
    try{
        article = await article.save()
        res.render(`articles/index`, {article})
    }catch(e){
         console.log(e)
         res.redirect('/')
    }
})



module.exports = router