var tessel = require('tessel');
var http = require('http');

var data = {
  foo: 'bar',
  baz: 'qux'
};

var dataString = JSON.stringify(data);

var headers = {
  'Content-Type': 'application/json',
  'Content-Length': dataString.length
};

var options = {
  host: 'httpbin.org',
  port: 80,
  path: '/post',
  method: 'POST',
  headers: headers
};

function post(){
	var req = http.request(options, function(res) {
  		res.setEncoding('utf-8');
	
	  	var responseString = '';
	
		res.on('data', function(data) {
			responseString += data;
		});
	
		res.on('end', function() {
			console.log('end', JSON.parse(responseString));
			
			setTimeout(post, 1500);
		});
	});
	
	req.on('error', function(e) {
  		console.log('error', e);
	});
	
	req.write(dataString);
	req.end();
}

post();