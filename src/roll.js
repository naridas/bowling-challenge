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
