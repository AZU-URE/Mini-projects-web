const express = require("express")
const bodyParser = require("body-parser")
const { parse } = require("path")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "\\index.html")
})


app.post("/", function (req, res) {
    console.log(req.body.num1)
    var num1 = req.body.num1
    var num2 = req.body.num2
    var result = Number(num1) + Number(num2)
    // res.send(num1 + num2)
    res.send("the result of calculation is:" + result)
})

app.get("/bmicalculator", function (req, res) {
    res.sendFile(__dirname + "\\bmi-calculator.html")
})

app.post("/bmicalculator", function (req, res) {

    var weight = parseFloat(req.body.weight)
    var height = parseFloat(req.body.height)
    var result = weight / height ** 2
    res.send("Your bmi is " + Math.round(result * 100) / 100)
})


app.listen(3000, function () {
    console.log("listening on port 3000")
})