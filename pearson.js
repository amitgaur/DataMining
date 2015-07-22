

module.exports = function(data,params){
	var user1 = params.user1;
	var user2 = params.user2;
	
	if (user1 in data && user2 in data){
		var rating1 = data[user1];
		var rating2 = data[user2];
		var xi = 0;
		var yi = 0;
		var xi2 = 0;
		var yi2 = 0;
		var n = 0;
		var xiyi = 0;
		Object.keys(rating1).forEach(function(item,index,array){
			if (rating2[item]){
				console.log(item);
				//n++;
				//xi+=rating1[item];
				//yi+=rating2[item];
				
			}
				
		});
		
	}
	
	
}