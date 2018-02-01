//a POST routes /api/friends - this handles incoming survey results. will also used to handle the compatibility logic
var friendList = require('../data/friends.js');

module.exports = function(app){
  app.get('/api/friends', function(req,res){
    res.json(friendList);
  });

  app.post('/api/friends', function(req,res){
    //grabs the new friend's scores to compare in friendList array
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    //search through friends
    for(var i=0; i<friendList.length; i++){
      var scoresDiff = 0;
      //compare scores
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      scoresArray.push(scoresDiff);
    }

    //find best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    var bff = friendList[bestMatch];
    res.json(bff);

    friendList.push(req.body);
  });
};