var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tablesInfo = [];
var waitlistInfo = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "/reserve.html"));
});

app.get("/tables", function(req,res){
    res.sendFile(path.join(__dirname, "/tables.html"));
});

app.get("/api/tables", function(req,res){
    res.json(tablesInfo);
});

app.get("/api/waitlist", function(req,res){
    res.json(waitlistInfo);
})

app.post("/api/tables", function(req,res){
    if(tablesInfo.length > 4){
        waitlistInfo.push(req.body);
        res.json(false);
    }else{
        tablesInfo.push(req.body);
        res.json(true);
    }
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
