'use strict';
var Tournament2Html = require('app/Tournament2Html');
var should = require('should');

describe('Tournament2Html tests', function() {

  it('header', function(done) {
    var th = new Tournament2Html();
    th.header(
      { some: "thing" },
      { fail:function(err) { should.fail('Error: '+err);},
        succeed:function(html) {
          html.should.eql(false);
          done();
        }
      }
    );
  });

}); // end describe

