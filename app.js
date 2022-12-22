const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000


const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true})
const articleSchema ={
  title: String,
  content: String
}
const Article = mongoose.model("Article", articleSchema)

app.get("/articles", (req, res) => {
  Article.find({}, (err, foundArticles)=>{
    if(err){
      res.send(err)
    } else {
      res.json(foundArticles)
    }
  })
  
  
})

app.post("/articles", (req, res) =>{
  
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })
  newArticle.save((err)=>{
    if(err){
      res.send(err)
    } else {
      res.send("Successfully added a new article")
    }
  })



})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})