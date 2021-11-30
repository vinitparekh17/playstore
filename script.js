const express = require("express");
const playstore = require("google-play-scraper");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {

    playstore.search({
        term: req.body.s,
        num: 1

    }).then(Data => {
        let App;

        try {
            App = JSON.parse(JSON.stringify(Data[0]));
        } catch (error) {
            return res.write("<h1> Error 404: </h1> <br /> <h2> Application not found!</h2>")
        }
        var name = App.title;
        var icon = App.icon;
        var description = App.summary;
        var dev = App.developer;
        var url = App.url;
        var value = App.priceText;
        var score = App.scoreText;

        res.render('result',
            {
                appName: name,
                appDescription: description,
                appIcon: icon,
                appValue: value,
                appScore: score,
                appUrl: url,
                appDev: dev
            })
    })
})

app.listen(process.env.PORT , (req, res) => {
    console.log("http://localhost:5500/")
})
