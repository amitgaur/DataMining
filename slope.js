var fs = require('fs');
var lodash = require('lodash');
var argv = require('yargs').argv;


var fileName = argv['fileName'];
if (!fileName){
	console.log("invalid args");
	return;
}

fs.readFile(fileName,function(err, data){
	if (err){
		console.log("Unable to read datda",err);
		return;
	}
	else {
		processData(JSON.parse(data));
	}
	
});

function processData(jsonData){
	
	console.log(jsonData);
	
}