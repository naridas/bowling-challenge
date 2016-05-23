describe('Score', function () {
  var score
  var frameStrike
  var rollStrikeA
  var rollStrikeB
  var frameSpare
  var rollSpareA
  var rollSpareB
  var frameNormal
  var rollNormalA
  var rollNormalB

  beforeEach(function () {
    score = new Score()
    frameStrike = new Frame(1, rollStrikeA, rollStrikeB)
    rollStrikeA = new Roll(1, 10)
    frameSpare = new Frame(1, rollSpareA, rollSpareB)
    rollSpareA = new Roll(1, 4)
    rollSpareB = new Roll(1, 6)
    frameNormal = new Frame(1, rollNormalA, rollNormalB)
    rollNormalA = new Roll(1, 4)
    rollNormalB = new Roll(1, 5)
  })

  it('adds a frame to frames', function () {
    score.addFrame(1, frameStrike)
    expect(score._frames).toEqual({1: frameStrike})
  })

  it('Check if strike', function () {
    expect(score.isStrike(frameStrike)).toEqual(true)
  })

  it('Check if spare', function () {
    expect(score.isSpare(frameSpare)).toEqual(true)
  })

  it('Changes undefined to zero', function () {
    expect(score.undefinedToFrameZero(undefined)).toEqual(new Frame(1, new Roll(0, 0), new Roll(0, 0)))
  })

  it('Calculate 1 Strike', function () {
    score.addFrame(1, frameStrike)
    expect(score.strikeCalculate(1)).toEqual(10)
  })

  it('Calculate 2 Strike', function () {
    score.addFrame(1, frameStrike)
    score.addFrame(2, frameStrike)
    expect(score.strikeCalculate(1)).toEqual(20)
  })

  it('Calculate 2 Strike and 1 Spare', function () {
    score.addFrame(1, frameStrike)
    score.addFrame(2, frameStrike)
    score.addFrame(3, frameSpare)
    expect(score.strikeCalculate(1)).toEqual(24)
  })

  it('Calculate 1 Strike, 1 spare', function () {
    score.addFrame(1, frameStrike)
    score.addFrame(2, frameSpare)
    expect(score.strikeCalculate(1)).toEqual(20)
  })

  it('Calculate 1 Spare', function () {
    score.addFrame(1, frameSpare)
    expect(score.spareCalculate(1)).toEqual(10)
  })

  it('Calculate 2 Spare', function () {
    score.addFrame(1, frameSpare)
    score.addFrame(2, frameSpare)
    expect(score.spareCalculate(1)).toEqual(14)
  })

  // it('Calculate total score for 1 strike', function () {
  //   score.addFrame(1, frameStrike)
  //   expect(score.calculateTotalScore()).toEqual(10)
  // })

  // it('Calculate total score for 2 strike', function () {
  //   score.addFrame(1, frameStrike)
  //   score.addFrame(2, frameStrike)
  //   expect(score.calculateTotalScore()).toEqual(20)
  // })

  it('Calculate total score for 5 normal', function () {
    score.addFrame(1, frameStrike)
    score.addFrame(2, frameNormal)
    score.addFrame(3, frameNormal)
    score.addFrame(4, frameNormal)
    score.addFrame(5, frameNormal)
    score.calculateTotalScore()
    expect(score._score).toEqual(45)
  })

  it('Calculate total score for 5 normal and 1 strike', function () {
    score.addFrame(1, frameStrike)
    score.addFrame(2, frameNormal)
    score.addFrame(3, frameNormal)
    score.addFrame(4, frameNormal)
    score.addFrame(5, frameNormal)
    score.addFrame(6, frameNormal)
    score.calculateTotalScore()
    expect(score._score).toEqual(64)
  })
})
