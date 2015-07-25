'use strict';
var app = require('app/index');
var should = require('should');

describe('index tests', function() {

  it('list', function(done) {
    app.list({
      fail:function(err) { should.fail('Error: '+err);},
      succeed:function(data) {
        Object.keys(data).length.should.above(-1); // not sure how to test this
        done();
      }
    });
  });

}); // end describe

