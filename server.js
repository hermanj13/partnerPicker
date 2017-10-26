var express = require('express');
var app = express();
var path    = require("path");
const jsonfile = require('jsonfile');
const file = "./static/js/students.json";

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',function(req,res){
  res.render("index");
})

app.get('/attendance',function(req,res){
  res.render("attendance");
})

app.post('/attendance/submit', function(req,res){
  data = JSON.parse(req.body.data);
  jsonfile.writeFile(file, data, function (err) {
    res.send(err)
  })
})

app.get('/attendance/retrieve', function(req,res){
  let students = [];
  jsonfile.readFile(file, function(err, obj) {
    students = obj;
    res.json(students)
  });
})

app.listen('8000');
exports = module.exports = app;
