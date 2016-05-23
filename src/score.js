function Score () {
  this._frames = {}
  this._score = 0
}

Score.prototype.addFrame = function (n, frame) {
  this._frames[n] = frame
}

Score.prototype.totalScore = function (n, frame) {
  this.addFrame(n, frame)
  this.calculateTotalScore(this._frames)
}

Score.prototype.isStrike = function (frame) {
  return frame._rollA.pins() === 10
}

Score.prototype.isSpare = function (frame) {
  return frame._rollA.pins() !== 10 && frame.frameScore() === 10
}

Score.prototype.undefinedToFrameZero = function (frame) {
  return frame = frame || new Frame(1, new Roll(0, 0), new Roll(0, 0))
}

Score.prototype.strikeCalculate = function (frameNumber) {
  var frame = this._frames[frameNumber]
  var frameB = this.undefinedToFrameZero(this._frames[frameNumber + 1])
  var frameC = this.undefinedToFrameZero(this._frames[frameNumber + 2])
  if (this.isStrike(frame) && this.isStrike(frameB)) {
    return frame.frameScore() + frameB.frameScore() + frameC._rollA.pins()
  }
  if (this.isStrike(frame)) {
    return frame.frameScore() + frameB.frameScore()
  }
}

Score.prototype.spareCalculate = function (frameNumber) {
  var frame = this._frames[frameNumber]
  var frameB = this.undefinedToFrameZero(this._frames[frameNumber + 1])
  if (this.isSpare(frame)) {
    return frame.frameScore() + frameB._rollA.pins()
  }
}

Score.prototype.calculateTotalScore = function () {
  this._score = 0
  for (var frameNumber in this._frames) {
    var frame = this._frames[frameNumber]
    if (this.isStrike(frame)) {
      this._score += this.strikeCalculate(frameNumber)
    } else if (this.isSpare(frame)) {
      this._score += this.spareCalculate(frameNumber)
    } else {
      this._score += frame.frameScore()
    }
  }
}
