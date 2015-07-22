
function ad_cosine(ratings,  key1,  key2){

  Object.keys(ratings).forEach(function(item){

      console.log(item);
  });
  console.log("Got a request", ratings, key1, key2);
  if (!key1|| !key2) {
    console.log("Invalid request");
    return null;
  }




}



module.exports = ad_cosine;
