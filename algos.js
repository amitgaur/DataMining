var argv = require('yargs').argv;
var underscore = require('underscore');
var fs = require('fs');
var logger = require('logger');
var pearson = require('pearson');
function printUsage(){
	
	logger.info(" params --fileName=<json file with ratings> --algo=<manhattan|minkowski --user=<user for which recommendation needed>");
	
}

/**
* Read file and call appropriate routine
**/
function readFile(filename,callback, params){
	fs.readFile(filename, function(err, data){
		if (err){
			logger.info("error reading file", err);
		}
		else {
			//logger.info("Here are the params", params);
			callback(JSON.parse(data), params);
		}
	});


}

function validateArgs(argv){
	var fileName = argv['fileName'];
	var algo = argv['algo'];
	var user = argv['user'];
	if (fileName === undefined || algo == undefined || user == undefined){
	
		printUsage();
		return;		
	}
	else {
		
		var params = {};
		params.fileName = fileName;
		params.user = user;
		params.algo = algo;
		return params;
	}
}
function manhattan(data,params){
	logger.info("Running manhattan", data, params);
	var user1 = params.user1;
	var user2 = params.user2;
	if (user1 in data && user2 in data)
	{
		var distance = 0.0; 
		
		var rating1 = data[user1];
		var rating2 = data[user2];
		Object.keys(rating1).forEach(function(item,index, array){
			if (rating2[item]){
				distance += Math.abs(rating2[item]-rating1[item]);
			}
			
		});
		
		return distance;
	}
	else {
		logger.info("invalid users");
		return 0;
	}
}

function minkowski(data, params){
	logger.info("Running minkowski", data, params);
	var user1 = params.user1;
	var user2 = params.user2;
	var r  = params.r;
	
	if (user1 in data && user2 in data && (typeof r !== "undefined"))
	{
		var distance = 0.0; 
		
		var rating1 = data[user1];
		var rating2 = data[user2];
		Object.keys(rating1).forEach(function(item,index, array){
			if (rating2[item]){
				distance += Math.pow(Math.abs(rating1[item]-rating2[item]),r);
				
			}
			
		});
		
		
		return Math.pow(distance,1/r);
	}
	else {
		logger.info("invalid users");
		return 0;
	}
	
	
}



function nearestNeighbor(data, params){
	logger.info("Params in nn", params);

	if (typeof(data)=== 'undefined' || typeof(params) === 'undefined'){
		logger.error("invalid args");
		return;
	}
    var user = params.user;
    var algo = params.algoMap[params.algo];
	var distances = {};
	Object.keys(data).forEach(function(currUser, index, array){
		
		if (currUser != user){
			
			var distance  = algo(data, {'user1' : user, 'user2': currUser});
			if (distances[distance] && underscore.isArray(distances[distance])){
				
				distances[distance].push(currUser);
			} else {
				distances[distance] = [currUser];
			}
		}
		
		
	});
	
	var sortedKeys = sort(distances);
	
	
	console.log("All neighbors ", sortedKeys);
	console.log("Nearest neighbors ", distances[sortedKeys[0]]);
	return distances[sortedKeys[0]];
}

function sort(map){
	
	var sortedKey = [];
	
	Object.keys(map).forEach(function(key){
		sortedKey.push(key);
		
	});
	
	sortedKey.sort();
	
	return sortedKey;
	 
	
}

function findRecommendations(data, user, nearestNeighbor){
	
	var recommendations = {};
	console.log(Object.keys(data[user]));
	console.log(Object.keys(data[nearestNeighbor]	));
	Object.keys(data[nearestNeighbor]).forEach(function(item, index, array){
		if (Object.keys(data[user]).indexOf(item)!=-1){
			console.log("Common rating between %s and %s is %s", user,nearestNeighbor, item);
		}
		else {
			console.log("Uncommon rating between %s and %s is %s", user,nearestNeighbor, item);
			recommendations[item] = data[nearestNeighbor][item];
		}
	});
	console.dir(recommendations);
	
	
}
 
function myprocess(data, params){
	if (params.user && !data[params.user]) {
		logger.info("Invalid args");
		return;
	}

	var nn = nearestNeighbor(data,params);
	logger.info("Nearest neighbor ", params.user, nearestNeighbor);
	
}

var params = validateArgs(argv);
if (params === undefined){
	logger.error("Invalid args");
	return;
}
params.algoMap = {'manhattan' : manhattan, 'minkowski' : minkowski, 'pearson' : pearson};
if (params.algoMap[params.algo]){
	readFile(params['fileName'],myprocess, params);
	
}
else {
	logger.info("Unsupported algo");
}