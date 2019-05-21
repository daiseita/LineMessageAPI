// 引用linebot SDK
var linebot = require('linebot');
var lineBot = require('./lib/Linebot.js');
const https     = require("https");
var express = require('express');   
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');   
var app = express();
const SERVER_CONFIG = {
    key:  fs.readFileSync('server.key', 'utf8'),
    cert: fs.readFileSync('server.pem', 'utf8')
};
var bot = new lineBot();
app.use('/images', express.static(__dirname + '/images'));      
const linebotParser = bot.parser();


app.get("/", function (req, res) { 
    res.send("Hello LineBot");
});
app.post('/', linebotParser);

//API send broadcast text
app.get("/Line/cmd/text", function (req, res) { 
	    var text= req.query.text;  
	    bot.broadcast(text);
    res.send(text);
});
//API send broadcast img
app.get("/Line/cmd/img", function (req, res) { 
	    var img= req.query.img;  
	    var obj = {
            type: 'image',
            originalContentUrl: img,
            previewImageUrl: img
          }
	    bot.broadcast(obj);
    res.send("ok");
})

https.createServer(SERVER_CONFIG, app)
     .listen(8082,function() { console.log("HTTPS sever started "+ 8082); }
);




