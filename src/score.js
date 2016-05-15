'use strict';

function Score(){
  this._frames = []
}

Score.prototype.addFrame = function (frame) {
  this._frames.push(frame);
};

Score.prototype.totalScore = function (frame) {
  this.addFrame(frame);
  this.calculateTotalScore();
};

Score.prototype.isStrike = function (frame) {
  return frame._rollA.pins() === 10;
};

Score.prototype.isSpare = function (frame) {
  return frame._rollA.pins() !== 10 && frame.frameScore() === 10;
};

Score.prototype.specificFrameScore = function (frame) {
  return this._frames[this.indexFrame(frame)].frameScore();
};

Score.prototype.undefinedToZero = function (frameScore) {
  return frameScore = frameScore || 0
};

Score.prototype.strikeCalculate = function (frameA) {
  var frameB = this.indexFrame(frameA) + 1
  var frameC = this.indexFrame(frameA) + 2
  if (this.isStrike(frameA) && this.isStrike(frameB)){
    return this.specificFrameScore(frameA) + this.undefinedToZero(this.specificFrameScore(frameB)) + this.undefinedToZero(this.specificFrameScore(frameC));
  };
  if (this.isStrike(frameA)){
    return this.specificFrameScore(frameA) + this.undefinedToZero(this.specificFrameScore(frameB));
  };
  return;
};

Score.prototype.spareCalculate = function (frame) {
  var frameB = this.indexFrame(frame) + 1
  if (this.isSpare(frame)){
    return this.specificFrameScore(frame) + this.undefinedToZero(this.specificFrameScore(frameB));
  };
  return;
};

Score.prototype.indexFrame = function (frame) {
  return this._frames.indexOf(frame);
};

Score.prototype.calculateTotalScore = function () {
  this._frames
};
