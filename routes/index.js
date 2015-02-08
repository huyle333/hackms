var express = require('express');
var router = express.Router();
// Twilio Credentials 
var accountSid = 'filler'; 
var authToken = 'filler'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){
	client.messages.create({ 
	to: "filler", 
	from: "filler", 
	body: "I need help. Emergency episode! Visit URL.",   
	}, function(err, message) { 
		console.log(message.sid); 
  	});

	/*
  	client.messages.create({ 
	to: "9179302108", 
	from: "+19782082471", 
	body: "I need help. Emergency episode! Visit URL",   
	}, function(err, message) { 
		console.log(message.sid); 
  	});
	*/
});

module.exports = router;
