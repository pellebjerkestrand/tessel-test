var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

var rate = 1.56, //NOTE: Hz
 	firstRun = true,
	previousCoordinates,
	planes = ['x', 'y', 'z'],
	threshold = .01;

function getSimplifiedCoordinates(coordinates){
	return {
		x: coordinates[0],
		y: coordinates[1],
		z: coordinates[2]
	};
}

function hasMoved(simplifiedCoordinates){
	var tempCoordinates = previousCoordinates;
	previousCoordinates = simplifiedCoordinates;
	
	if(firstRun) {
		firstRun = !firstRun;
		return true;
	}
	
	for(var i = 0; i < planes.length; i++){
		var diff = Math.abs(tempCoordinates[planes[i]] - simplifiedCoordinates[planes[i]]);
		 		
		if(diff > threshold){
			return true;
		}
	}
	
	return false;
}

function startAlarm(){
	console.log('Intruder!');
	tessel.led[0].output(1);
	tessel.led[1].output(1);
}

function endAlarm(){
	tessel.led[0].output(0);
	tessel.led[1].output(0);
}

accel.on('ready', function () {
	accel.setOutputRate(rate, function rateSet() {
    accel.on('data', function (data) {
			var coords = getSimplifiedCoordinates(data);
			
			if(hasMoved(coords)){
				startAlarm();
			} else {
				endAlarm();
			}
		});
  });
});

accel.on('error', function(err){
	console.log('Error:', err);
});