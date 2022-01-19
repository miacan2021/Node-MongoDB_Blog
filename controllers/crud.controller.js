const Article = require('../models/articles')
const Comment = require('../models/comment')

exports.getNew = (req, res) => {
    res.render('articles/new', {article: new Article()})
}

exports.getEdit = async(req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article})
}

exports.getMorePage = async(req, res) => {
    const article = await Article.findById(req.params.id)
    if(article === null) res.redirect('/')
    res.render('articles/show', {article})
}

exports.postArticle = async (req, res) => {
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
 }


 exports.postEditArticle = async(req, res) => {
    const {title, content} = req.body
    let article = await Article.findById(req.params.id)
    article.title = title,
    article.content = content
    try{
        article = await article.save()
        res.render(`articles/show`, {article})
    }catch(e){
         console.log(e)
         res.render(`articles/show`, {article})
    }
}


exports.postDeleteArticle = async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    await Comment.deleteMany({articleId: req.params.id})
    res.redirect('/')
}