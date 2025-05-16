require('dotenv').config();

let express = require('express');
let bodyParser =  require("body-parser");
let app = express();
console.log("Hello World");

app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
}); 

app.get('/', function (req, res) {
    const absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname + '/public'));

app.get("/json", function(req, res) {
    let message = "Hello json";

    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }

    res.json({"message": message});
});

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next(); 
}, function (req, res){
    res.json({"time": req.time});
});

app.get("/:word/echo", function(req, res) {
    const word = req.params.word;
    res.json({"echo": word});
});

app.post("/name", function(req, res) {
    if (req.body.first && req.body.last) {
        const response = {"name": `${req.body.first} ${req.body.last}`}
        res.json(response);
    } else {
        res.json({"error": "Cant find name or last name"});
    }

});

module.exports = app;
