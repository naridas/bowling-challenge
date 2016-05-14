'use strict';

describe('Roll', function() {

  var roll;

  beforeEach(function() {
    roll = new Roll(1, 9);
  });

  it('Roll number', function() {
    expect(roll.rollNumber()).toEqual(1);
  });

  it('Pins hit by the roll', function() {
    expect(roll.pins()).toEqual(9);
  });

});
