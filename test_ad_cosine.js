var ad_cosine  = require('ad_cosine');
var fs = require('fs');

var fileName = "chap3.json";

fs.readFile(fileName,function(err, data){
    if (err){
      console.log("err",err);

    }
    else {
      var ratings  = JSON.parse(data);
      processRatings(ratings,"Kacey Musgraves","Imagine Dragons");
    }

});


//S[i,j] = Summmation(Ru,i - Ravg)*(Ru,j - Ravg)/(Summation(Ru,i - Ru)^2)^1/2
function processRatings(ratings, song1, song2){
  var averageMap ={};
  Object.keys(ratings).forEach(function(user){
    console.log("User ", user);
    var count  = 0;
    var total = 0;
    Object.keys(ratings[user]).forEach(function(song){
      console.log(ratings[user][song]);
      total +=parseFloat(ratings[user][song]);
      count++;
    });
    console.log("Average for user ", user , "is " , total/count);
    averageMap[user] = total/count;
});
  var num = 0.0;
  var den = 0.0;
  var xi2 =0.0;
  var yi2= 0.0;
    Object.keys(ratings).forEach(function(user){
		var x = 0.0;
		var y = 0.0;
		
	
		if(song1 in ratings[user] && song2 in ratings[user]){
		 	num+=(ratings[user][song1] -averageMap[user])*(ratings[user][song2] - averageMap[user]);
			xi2+=Math.pow(ratings[user][song1] - averageMap[user],2);
			yi2+=Math.pow(ratings[user][song2] - averageMap[user],2);
			
		}
		
      

  });
  den = Math.pow(xi2,1/2)*Math.pow(yi2,1/2);
  console.log("Result for " , song1, song2 , " is ", (num/den));
  return num/den;


}
