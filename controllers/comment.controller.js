const Article = require('../models/articles')
const Comment = require('../models/comment')

exports.postComment = async (req, res) => {
    let article = await Article.findById(req.params.id)
    let comment = new Comment({
        name: req.body.name,
        comment: req.body.comment,
        articleId: article.id
     })
    try{
        comment = await comment.save()
        article.comments = [...article.comments, {name:comment.name, comment:comment.comment, createdAt:comment.createdAt }]
        article = await article.save()
        res.render(`articles/show`, {article})
    }catch(e){
         console.log(e)
         res.redirect('/')
    }
 }