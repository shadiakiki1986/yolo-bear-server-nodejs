'use strict';
var YoloBearTournament = require('app/YoloBearTournament');
var should = require('should');

describe('YoloBearTournament tests', function() {

  it('cycle: drop, not exists, get, exists', function(done) {
    var dm = new YoloBearTournament();
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

                        dm.drop("test 123",{
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

    dm.drop("test 123",{
      fail:function(err) { mycontinue(); }, // silent fail on not exists
      succeed:function() { mycontinue(); }
    });
  });

  it('list', function(done) {
    var dm = new YoloBearTournament();
    dm.list({
      fail:function(err) { should.fail('Error: '+err);},
      succeed:function(data) {
        data.length.should.above(-1); // not sure how to test this
        done();
      }
    });
  });

}); // end describe

});
