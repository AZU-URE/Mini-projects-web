const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "\\html\\signup.html")
})

app.post("/", function (req, res) {
    // console.log(req.body)
    const email = req.body.email
    const fname = req.body.firstName
    const lname = req.body.lastName
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/93408e8265"
    const options = {
        method: "POST",
        auth: "garima:167bcfd01e4602abbcac31117be3a99a-us21"
    }
    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            // console.log(JSON.parse(data));
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "\\html\\success.html")
            }
            else {
                res.sendFile(__dirname + "\\html\\failure.html")
            }
        })
    })

    request.write(jsonData)
    request.end()
})
app.post("/failure", function (req, res) {
    res.redirect("/")
})
app.listen(3000, function () {
    console.log("listening on port 3000");
})



// api key : 167bcfd01e4602abbcac31117be3a99a-us21
// list id: 93408e8265