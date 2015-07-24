'use strict';
var User = require('app/User');
var should = require('should');

describe('User tests', function() {

  it('get', function(done) {
    var dm = new User();
    dm.get(
      "some random name",
      "some random password",
      { fail:function(err) {
          err.should.eql('Email doesnt exist');
          done();
        },
        succeed:function(data,res) {
          should.fail("Shouldnt get here");
        }
      }
    );
  });

  it('list', function(done) {
    var dm = new User();
    dm.list({
      fail:function(err) { should.fail('Error: '+err);},
      succeed:function(data) {
        data.length.should.above(-1); // not sure how to test this
        done();
      }
    });
  });

  it('putNick', function(done) {
    var dm = new User();
    dm.putNick(
      "whatever123", "something123", "some nick",
      { fail:function(err) { should.fail('Error: '+err);},
        succeed:function(data) {
          dm.list({
            fail:function(err) { should.fail('Error: '+err);},
            succeed:function(data) {
              var nicks = data.map(function(x) { return x.nick; });
              nicks.indexOf("some nick").should.not.eql(-1);
              done();
            }
          });
        }
      }
    );
  });

  it('putEmail invalid', function(done) {
    var dm = new User();
    dm.putEmail(
      "whatever123", "something123", "a password",
      "some nick", "metadata",
      { fail:function(err) { should.fail('Error: '+err);},
        succeed:function(data) {
          dm.list({
            fail:function(err) {
              err.should.eql('Invalid email');
              done();
            },
            succeed:function(data) { should.fail("Shouldnt get here"); }
          });
        }
      }
    );
  });

  it('putEmail valid', function(done) {
    var dm = new User();
    var myemail = "shadiakiki1986@gmail.com";
    dm.putEmail(
      myemail, "something123", "a password",
      "some nick", "metadata",
      { fail:function(err) { should.fail('Error: '+err);},
        succeed:function(data) {
          dm.list({
            fail:function(err) { should.fail("Shouldnt get here"); },
            succeed:function(data) {
              var emails = data.map(function(x) { return x.email0; });
              emails.indexOf(myemail).should.not.eql(-1);
              done();
            }
          });
        }
      }
    );
  });

  it('forgot password', function(done) {
    var dm = new User();
    var myemail = "shadiakiki1986@gmail.com";
    dm.forgotPassword( myemail, 
      { fail:function(err) { should.fail('Error: '+err);},
        succeed:function(data) {
          data.hasOwnProperty("warning").should.eql(true);
          done();
        }
      }
    );
  });


}); // end describe

