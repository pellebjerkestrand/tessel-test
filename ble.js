var tessel = require('tessel');
var blelib = require('ble-ble113a');

var ble = blelib.use(tessel.port['B']);

ble.on('ready', function(err) {
  console.log('Scanning...');
  ble.startScanning();
});

ble.on('discover', function(peripheral) {	
  console.log("Discovered peripheral!", peripheral.address.toString());
});