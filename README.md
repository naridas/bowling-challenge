first made roll spec
```
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

```
then made the roll class
```
'use strict';

function Roll(rollNumber, pinNumber){

  this._roll = rollNumber;
  this._pins = pinNumber;
}

Roll.prototype.rollNumber = function () {
  return this._roll
};

Roll.prototype.pins = function () {
  return this._pins
};

```
made fram spec
```
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

```
made frame class
```
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

```
Wrote my code first since i was unsure how i want to input my frames into it... first did it with arrays but that made my code messy so used hashes
```
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

```
Need to make some tests...
```
```



Bowling Challenge
=================


* Challenge time: rest of the day and weekend, and the entire of lab week if you need it, until Monday 9am
* Feel free to use google, your notes, books, etc. but work on your own
* If you refer to the solution of another coach or student, please put a link to that in your README
* If you have a partial solution, **still check in a partial solution**
* You must submit a pull request to this repo with your code by 9am Monday week

Task:
-----

Count and sum the scores of a bowling game for one player (in JavaScript).

A bowling game consists of 10 frames in which the player tries to knock down the 10 pins. In every frame the player can roll one or two times. The actual number depends on strikes and spares. The score of a frame is the number of knocked down pins plus bonuses for strikes and spares. After every frame the 10 pins are reset.

As usual please start by

* Forking this repo

* Finally submit a pull request before Monday week at 9am with your solution or partial solution.  However much or little amount of code you wrote please please please submit a pull request before Monday week at 9am.  And since next week is lab week you have a full extra week to work on this.


### Optional Extra

Create a nice interactive animated interface with jQuery.

## Strikes

The player has a strike if he knocks down all 10 pins with the first roll in a frame. The frame ends immediately (since there are no pins left for a second roll). The bonus for that frame is the number of pins knocked down by the next two rolls. That would be the next frame, unless the player rolls another strike.

## Spares

The player has a spare if the knocks down all 10 pins with the two rolls of a frame. The bonus for that frame is the number of pins knocked down by the next roll (first roll of next frame).

## 10th frame

If the player rolls a strike or spare in the 10th frame they can roll the additional balls for the bonus. But they can never roll more than 3 balls in the 10th frame. The additional rolls only count for the bonus not for the regular frame count.

    10, 10, 10 in the 10th frame gives 30 points (10 points for the regular first strike and 20 points for the bonus).
    1, 9, 10 in the 10th frame gives 20 points (10 points for the regular spare and 10 points for the bonus).

## Gutter Game

A Gutter Game is when the player never hits a pin (20 zero scores).

## Perfect Game

A Perfect Game is when the player rolls 12 strikes (10 regular strikes and 2 strikes for the bonus in the 10th frame). The Perfect Game scores 300 points.

In the image below you can find some score examples.

More about ten pin bowling here: http://en.wikipedia.org/wiki/Ten-pin_bowling

![Ten Pin Score Example](images/example_ten_pin_scoring.png)

Code Review
-----------

In code review we'll be hoping to see:

* All tests passing
* The code is elegant: every class has a clear responsibility, methods are short etc.

Reviewers will potentially be using this [code review rubric](docs/review.md).  Note that referring to this rubric in advance may make the challenge somewhat easier.  You should be the judge of how much challenge you want.

CI
--

We are running JSHint on our CI server - save yourself having to wait for a build to happen by linting your code on your machine first. [Here are installations for most popular editors](http://jshint.com/install/). Grab the `.jshintrc` from this repo and have better JS!

If you don't follow the usual Jasmine convention of having your tests in `spec` and your code in `src`, or you've built your code into a little app, CI will probably fail for you as we are doing *sneaky things*&trade; to make your tests run. However, there is a simple fix:

1. Open up your `.travis.yml`
2. On line 8, you will see where it looks for your code (`'src/**/*.js'`) and your tests (`'spec/**/*.js'`)
3. Adjust these to point to the correct directories
4. Done.
