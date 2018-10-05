var express = require("express");
var app = express();
var request = require("request");
var port = (process.env.VCAP_APP_PORT || 8080);

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/',function(req,res){

res.send("Hello World");

});

app.post('/webhook',function(req,res){

console.log("HelloWorld");
res.send("Request Body : "+JSON.stringify(req.body));


/*
// Sending email if required.. 
var payload = {
"recipients": "<email IDs>",
"subject": "hiii",
"template": "Template_SCPCODESNIPPET",
"mailText": "<HTML><body><h1>"+JSON.stringify(req.body)+"</h1></body></HTML>"
};

request.post('https://mockservicea1305c29f.hana.ondemand.com/mockservice/rest/notifymailv2', {json:payload})
//request.post('https://xs01sdctechmo.hana.ondemand.com/NAME-SURNAME/logic.xsjs', {json:req.body})
*/


});