var express = require('express');
var router = express.Router();
// Twilio Credentials 
var accountSid = 'AC0cc03e97d1f6d1b4787918810efcc01f'; 
var authToken = '8c3132b824a3737f6feeee92c3fdb09b'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){
	client.messages.create({ 
	to: "9788731120", 
	from: "+19782082471", 
	body: "Emergency episode!",   
	}, function(err, message) { 
		console.log(message.sid); 
  	});
});

module.exports = router;
