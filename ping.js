var tessel = require('tessel');
var http = require('http');

function ping(){
	http.get({
		host: 'www.google.com',
		path: '/'
	}, function(response){
		// explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
    response.setEncoding('utf8');

    // incrementally capture the incoming response body
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
		
		response.on('end', function(){
			if(response.statusCode === 200 || response.statusCode === 302){
				console.log('Google is up and reachable', response.statusCode);
				
				setTimeout(ping, 1000);
			} else {
				console.log('Google is down or unreachable', response.statusCode);
			}
		});
	}).on('error', function(error){
		console.error(error.message);
	});
}

ping();