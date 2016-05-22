function Score () {
  this._frames = {}
  this._score = 0
}

Score.prototype.addFrame = function (n, frame) {
  this._frames[n] = frame
}

Score.prototype.totalScore = function (n, frame) {
  this.addFrame(n, frame)
  this.calculateTotalScore()
}

Score.prototype.isStrike = function (frame) {
  return frame._rollA.pins() === 10
}

Score.prototype.isSpare = function (frame) {
  return frame._rollA.pins() !== 10 && frame.frameScore() === 10
}

Score.prototype.undefinedToZero = function (frameScore) {
  frameScore = frameScore || 0
}

Score.prototype.strikeCalculate = function (frameNumber) {
  var frameB = frameNumber + 1
  var frameC = frameNumber + 2
  if (this.isStrike(frameNumber) && this.isStrike(frameB)) {
    return this._frames[frameNumber].frameScore() + this.undefinedToZero(this._frames[frameB].frameScore()) + this.undefinedToZero(this._frames[frameC].frameScore())
  }
  if (this.isStrike(frameNumber)) {
    return this._frames[frameNumber].frameScore() + this.undefinedToZero(this._frames[frameB].frameScore())
  }
  return
}

Score.prototype.spareCalculate = function (frameNumber) {
  var frameB = frameNumber + 1
  if (this.isSpare(frameNumber)) {
    return this._frames[frameNumber].frameScore() + this.undefinedToZero(this._frames[frameB].frameScore())
  }
  return
}

Score.prototype.calculateTotalScore = function () {
  for (var frameNumber in this._frames) {
    if (this.isStrike(this._frames[frameNumber])) {
      this._score += this.strikeCalculate(frameNumber)
    }
    if (this.isSpare(this._frames[frameNumber])) {
      this._score += this.spareCalculate(frameNumber)
    }
    this._score += this._frames[frameNumber].frameScore()
  }
}
