const express = require("express")
const ejs = require("ejs")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const { log } = require("console")
const app = express()
const PORT = 3000;
const DB_URL = "mongodb://127.0.0.1:27017/wikiDB"
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))


mongoose.set('strictQuery', true)
mongoose.connect(DB_URL, function () {
    console.log("connected to database");
})
const wikiSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Article = new mongoose.model("Article", wikiSchema)

app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, foundArticle) {
            if (!err) {
                res.send(foundArticle)
            } else {
                re.send(err);
            }
        })
    })

    .post(function (req, res) {
        console.log(req.body.title);
        console.log(req.body.content);
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save(function (err) {
            if (!err) {
                res.send(received)
            }
            else {
                res.send(err)
            }
        })
    })

    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("deleted all articles")
            } else {
                res.send(err)
            }
        })
    })

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        const titleReq = req.params.articleTitle

        Article.findOne({ title: titleReq }, function (err, foundArticle) {
            if (!err) {
                res.send(foundArticle)
            } else {
                res.send(err)
            }
        })
    })

    .put(function (req, res) {
        // res.write("one step")
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content }, function (err) {
                if (!err) {
                    res.send("successfully put the request mentioned")
                }
                else {
                    res.send(err)
                }
            }
        )

    })

    .patch(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body }, function (err) {
                if (!err) {
                    res.send("patched succesfully")
                } else (
                    res.send(err)
                )
            }
        )
    })

    .delete(function (req, res) {
        Article.deleteOne({ title: req.params.articleTitle }, (err) => {
            if (!err) {
                res.send("deleted successfully")
            } else {
                res.send(err)
            }
        })
    })




app.listen(3000, () => {
    console.log("Connected to port " + PORT);
})