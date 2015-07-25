'use strict';
var Tournament2Html = require('app/Tournament2Html');
var should = require('should');

describe('Tournament2Html tests', function() {

  it('header', function() {
    var th = new Tournament2Html({ some: "thing" });
    var html = th.header();
    html.should.eql(false);
  });

}); // end describe

