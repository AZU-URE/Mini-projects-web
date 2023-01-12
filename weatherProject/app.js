const express = require("express")
const https = require("https")
const { dirname } = require("path")
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000


app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "\\index.html")
})

app.post("/", function (req, res) {
    const query = req.body.city
    const apiKey = process.env.API_KEY
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
    https.get(url, function (response) {


        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            // console.log(weatherData);
            try {
                const temp = weatherData.main.temp
                const weatherDesc = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                var imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
                res.write("<p>The weather is currently " + weatherDesc + "</p>")
                res.write("<h1>The temperature in " + query + " is " + temp + " degee celcius</h1>")
                res.write("<img src=" + imgUrl + ">")
                res.send()
            }
            catch (e) {
                res.send("no such city is there")
            }




        })
    })
})

app.listen(PORT, function () {
    console.log("server is listening on " + PORT)
})