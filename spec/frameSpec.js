'use strict';

describe('Frame', function() {

  var frame;
  var rollB;
  var rollA;

  beforeEach(function() {
    frame = new Frame(1, rollA, rollB);
    rollA = jasmine.createSpy('roll');
  });

  it('Frame number', function() {
    expect(frame.frameNumber()).toEqual(1);
  });

  it('Roll A', function() {
    expect(frame.rollA()).toEqual(rollA);
  });

  it('Roll B', function() {
    expect(frame.rollB()).toEqual(new Roll(0, 0));
  });

});
