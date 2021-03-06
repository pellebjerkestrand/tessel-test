var tessel = require('tessel');
var climatelib = require('climate-si7020');

var climate = climatelib.use(tessel.port['B']);


climate.on('ready', function () {
  console.log('Connected to si7020');

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('c', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        console.log('Degrees:', temp.toFixed(2) + ' C', 'Humidity:', humid.toFixed(4) + ' %RH');
        setTimeout(loop, 300);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});