var argv = require('yargs').argv;
var underscore = require('underscore');
var fs = require('fs');


console.dir( argv);

var fileName = argv['filename'];
var algo = argv['algo'];
var user1 = argv['user1'];
var user2 = argv['user2'];
var user = argv['user'];
if (fileName === undefined || algo === undefined) {
console.log("Invalid args");
process.exit();
}

var params = {};
params.algo = algo;
params.user1 = user1;
params.user2 = user2;
params.user = user;


algoMap = {'manhattan':  manhattan, 'nn'  : nearestNeighbor};




function readFile(filename,callback, params){
	fs.readFile(filename, function(err, data){
		if (err){
			console.log("error reading file", err);
		}
		else {
			//console.log(JSON.parse(data));
			callback(JSON.parse(data), params);
		}
	});


}

function manhattan(data, params){
	
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
		console.log("invalid users");
		return 0;
	}
}

function nearestNeighbor(data, params){
	var user = params.user;
	var distances = {};
	Object.keys(data).forEach(function(currUser, index, array){
		
		if (currUser != user){
			
			var distance  = manhattan(data, {'user1' : user, 'user2': currUser});
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
function process(data, params){
	if (params.user && !data[params.user] || (params.user1 && !data[params.user1]) || (params.user2 && !data[params.user2])) {
		console.log("Invalid args");
		return;
	}
	if (params.algo && params.algo in algoMap){
		
		console.log(findRecommendations(data, params.user, algoMap[params.algo](data, params)));
	}
	else {
		console.log("Dont know algo");
	}
	
}
readFile("data.json", process,params);

