'use strict';
var Tournament = require('app/Tournament');
var should = require('should');

describe('Tournament tests', function() {

  it('get', function(done) {
    var dm = new Tournament();
    dm.get(
      "some random name",
      { fail:function(err) { should.fail('Error: '+err);},
        succeed:function(data,res) {
          res.should.eql(false);
          done();
        }
      }
    );
  });

  it('list', function(done) {
    var dm = new Tournament();
    dm.list({
      fail:function(err) { should.fail('Error: '+err);},
      succeed:function(data) {
        data.length.should.above(-1); // not sure how to test this
        done();
      }
    });
  });

  it('cycle: drop, not exists, get, exists', function(done) {
    var dm = new Tournament();
    var mycontinue = function() {
      dm.get(
        "test 123",
        { fail:function(err) { should.fail('Error: '+err);},
          succeed:function(data,res) {
            res.should.eql(false);
            dm.new(
              "test 123",
              "pass123",
              {some:"thing"},
              { fail: function(err) { should.fail('Error: '+err); },
                succeed: function() {
                  dm.get(
                    "test 123",
                    { fail:function(err) { should.fail('Error: '+err); },
                      succeed:function(data,res) {
                        res.should.eql(true);

                        dm.drop("test 123","pass123",{
                          fail:function(err) { should.fail("Shouldnt get here"); },
                          succeed:function() { done(); }
                        });

                      }
                    });
                }
              });
          }
        });
    };

    dm.drop("test 123","pass123",{
      fail:function(err) { mycontinue(); }, // silent fail on not exists
      succeed:function() { mycontinue(); }
    });
  });

  it('get html', function(done) {
    var dm = new Tournament();
    dm.new(
      "test 123",
      "pass123",
      { teams: [],
        players: [],
        games: []
      },
      { fail: function(err) { should.fail('Error: '+err); },
        succeed: function() {
          dm.get(
            "test 123",
            { fail:function(err) { should.fail('Error: '+err);},
              succeed:function(data,res) {
                var re=/^<html .*<\/html>$/;
                re.test(data).should.eql(true);

                dm.drop("test 123","pass123",{
                  fail:function(err) { should.fail("Shouldnt get here"); },
                  succeed:function() { done(); }
                });
              }
            },
            true,
            false,
            true
          );
        }
      }
    );
  });

}); // end describe

