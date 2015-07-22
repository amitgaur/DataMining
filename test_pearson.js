var underscore = require('underscore');
var fs = require('fs');
var logger = require('logger');
var pearson = require('pearson');


fs.readFile("data.json", function(error, data){
	if (error){
		logger.error(err);
		
	}
	else{
	processData(data);
	}
});


function processData(data){
	logger.info(JSON.parse(data));
	
	Object.keys(data).forEach(function(item,index, array){
		
		logger.info("logging item " + item);
	});
	
}