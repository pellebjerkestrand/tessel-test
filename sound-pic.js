var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port['A']);
var camera = require('camera-vc0706').use(tessel.port['D']);
var notificationLed = tessel.led[3];

var canTakePicture = false;

camera.on('ready', function(){
  canTakePicture = true;
});

ambient.on('ready', function () {
  setInterval( function () {
  	ambient.getSoundLevel( function(err, sdata) {
    	if (err) {
			throw err;
		}
		
    	console.log("Sound Level:", sdata.toFixed(8));
  	});
  }, 500);

  ambient.setSoundTrigger(0.1);  
});

ambient.on('sound-trigger', function(data) {    
    if(!canTakePicture){
      console.log("Kameraet er ikke klart ennå :(");
      return;  
    }
    
    ambient.clearSoundTrigger();
    
    console.log("Smil ^_^");
    
    camera.takePicture(function(error, image){
      if(error){
        console.log('Error taking picture', error);
      } else {
        notificationLed.high();
        
        var name = 'picture-' + Date.now() + '.jpg';
        
        // TODO: Upload image to service
        process.sendfile(name, image);
        
        notificationLed.low();        
      }
    });    

    setTimeout(function () {
        ambient.setSoundTrigger(0.1);
    }, 1500);
  });

ambient.on('error', function (err) {
  console.log('ambient error', err);
});

camera.on('error', function(err) {
  console.error('camera error', err);
});