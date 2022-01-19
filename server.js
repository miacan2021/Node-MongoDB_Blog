require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/articles')
const articleRouter = require('./routes/articles')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))


app.get('/', async(req, res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc' })
    res.render('articles/index', {articles})
})

app.use('/articles', articleRouter)


const PORT = process.env.PORT || 8000


mongoose 
 .connect(process.env.MONGODB_URL)   
 .then(() => {
     console.log("Database connected!")
     app.listen(PORT)
    })
 .catch(err => console.log(err));
