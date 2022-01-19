const Article = require('../models/articles')

exports.addLike =  async(req, res) => {
    let article = await Article.findById(req.params.id)
    article.like += 1
    try{
        article = await article.save()
        let articles = await Article.find().sort({createdAt: 'desc' })
        res.render('articles/index', {articles})
    }catch(e){
         console.log(e)
         res.redirect('/')
    }  
    }



    exports.addDislike = async(req, res) => {
    let article = await Article.findById(req.params.id)
    article.dislike += 1
    try{
        article = await article.save()
        let articles = await Article.find().sort({createdAt: 'desc' })
        res.render('articles/index', {articles})
    }catch(e){
         console.log(e)
         res.redirect('/')
    }
    }


