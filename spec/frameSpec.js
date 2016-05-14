'use strict';

describe('Frame', function() {

  var frame;
  var rollB;
  var rollA;

  beforeEach(function() {
    rollA = {
      pins: function() {
        return value;
      }
    };
    frame = new Frame(1, rollA, rollB);
    spyOn(rollA,'pins').and.returnValue(10);
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

  it('frame score', function() {
    expect(frame.frameScore()).toEqual(10);
  });

});
