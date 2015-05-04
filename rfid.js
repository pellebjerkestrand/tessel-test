var tessel = require('tessel');
var rfid = require('rfid-pn532').use(tessel.port['A']); 

rfid.on('ready', function (version) {
	console.log('Ready to read RFID card');
	
	rfid.on('data', function(card) {
		console.log(card);
	});
});

rfid.on('error', function (err) {
  	console.error(err);
});