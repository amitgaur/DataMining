

function pearson(data, params){
	
	if (typeof data === "undefined" || typeof params == "undefined" || !params.user1  || !params.user2 || !data[params.user1] 
	|| !data[params.user2]){
		
		console.log("Undefined data");
		
		
	}
	else{
		var user1 = params.user1;
		var user2 = params.user2;
		console.log("args ok");
		var xi = 0.0, yi = 0.0;
		Object.keys(data[user1]).forEach(function(item, index, array){
			
			if (item in data[user2]){
				xi+= data[user1][item];
				yi+= data[user2][item];
				
			}
		})
	}
}
var json ='{"Angelica":{"Blues Traveler":"3.5", "Broken Bells": "2.0", "Norah Jones": "4.5", "Phoenix": "5.0","Slightly Stoopid": "1.5","The Strokes": "2.5", "Vampire Weekend": "2.0"},"Bill":{"Blues Traveler": "2.0", "Broken Bells": "3.5","Deadmau5": "4.0", "Phoenix": "2.0","Slightly Stoopid":"3.5", "Vampire Weekend": "3.0"}}';
var data = JSON.parse(json);

var params= {'user1' : 'Angelica', 'user2' : 'Bill'};
pearson(data, params);