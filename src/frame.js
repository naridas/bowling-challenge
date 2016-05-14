'use strict';

function Frame(frameNumber, rollA, rollB){
  this._frame = frameNumber;
  this._rollA = rollA;
  this._rollB = rollB !== undefined ? rollB : new Roll(0, 0);
}

Frame.prototype.frameNumber = function () {
  return this._frame
};

Frame.prototype.rollA = function () {
  return this._rollA
};

Frame.prototype.rollB = function () {
  return this._rollB
};

Frame.prototype.frameScore = function () {
  return (this._rollA.pins() + this._rollB.pins())
};
