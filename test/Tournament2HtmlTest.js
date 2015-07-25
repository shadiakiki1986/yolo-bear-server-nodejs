'use strict';
var Tournament2Html = require('app/Tournament2Html');
var should = require('should');

describe('Tournament2Html tests', function() {

  it('invalid input', function() {
    try {
      var th = new Tournament2Html({ some: "thing" });
      should.fail("Shouldnt get here");
    } catch(ex) {
      ex.should.eql("Missing tournamentName field");
    }
  });

  it('header', function() {
    var th = new Tournament2Html({
      tournamentName: "thing",
      tournamentData: {
        teams: [],
        players: [],
        games: []
      }
    });
    var html = th.header();
    html.length.should.above(10);
  });

  it('html 1', function() {
    var th = new Tournament2Html({
      tournamentName: "thing",
      tournamentData: {
        teams: [],
        players: [],
        games: []
      }
    });
    var html = th.html();
    html.length.should.above(10);
  });

  it('html 2', function() {
    var td = "{\"players\":[{\"id\":0,\"name\":\"d\",\"teamId\":7,\"gameStats\":[{\"gid\":0,\"playerId\":0,\"playerName\":\"d\",\"playerTeam\":{\"id\":7,\"name\":\"asdfasdfasdf\"},\"Score\":0,\"Assists\":0,\"Rebounds\":0,\"Steals\":0,\"Blockshots\":0}]},{\"id\":3,\"name\":\"wwww\",\"teamId\":7,\"gameStats\":[{\"gid\":0,\"playerId\":3,\"playerName\":\"wwww\",\"playerTeam\":{\"id\":7,\"name\":\"asdfasdfasdf\"},\"Score\":0,\"Assists\":0,\"Rebounds\":0,\"Steals\":0,\"Blockshots\":0}]},{\"id\":1,\"name\":\"f\",\"teamId\":3,\"gameStats\":[{\"gid\":0,\"playerId\":1,\"playerName\":\"f\",\"playerTeam\":{\"id\":3,\"name\":\"rrr\"},\"Score\":0,\"Assists\":0,\"Rebounds\":0,\"Steals\":0,\"Blockshots\":0}]},{\"id\":2,\"name\":\"gg\",\"teamId\":0,\"gameStats\":[]}],\"teams\":[{\"id\":7,\"name\":\"asdfasdfasdf\"},{\"id\":3,\"name\":\"rrr\"},{\"id\":0,\"name\":\"t1\"},{\"id\":1,\"name\":\"t2\"},{\"id\":2,\"name\":\"t3\"}],\"games\":[{\"id\":0,\"team1Id\":7,\"team2Id\":3,\"state\":\"Playing\"}],\"statNames\":[\"Score\",\"Assists\",\"Rebounds\",\"Steals\",\"Blockshots\"]}";
    var th = new Tournament2Html({
      tournamentName: "thing",
      tournamentData: td
    });
    var html = th.html();
    html.length.should.above(10);
  });


}); // end describe

