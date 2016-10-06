'use strict';

var _guitar = require('./guitar');

var _guitar2 = _interopRequireDefault(_guitar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* global it, describe, expect */

describe('Guitar Chords', function () {
  describe('Strings', function () {
    return it('Should have 6 strings', function () {
      return expect(_guitar2.default.main.strings).toEqual(6);
    });
  });

  describe('Types', function () {
    return _guitar2.default.types.map(function (type) {
      return it('Type suffix ' + type.suffix + ' should have a description', function () {
        return expect(type.name).toBeDefined();
      });
    });
  });

  describe('Chords', function () {
    Object.keys(_guitar2.default.chords).map(function (key) {
      describe('Key ' + key + ' chords', function () {
        var chords = _guitar2.default.chords[key];

        it('Should not have duplicated suffixes', function () {
          var seen = new Set();
          var duplicates = chords.some(function (chord) {
            return seen.size === seen.add(chord.suffix).size;
          });
          expect(duplicates).toBe(false);
        });

        chords.map(function (chord) {
          return describe('Chord ' + chord.key + chord.suffix, function () {
            describe('General properties', function () {
              it('The chord ' + key + chord.suffix + ' should have a defined key property', function () {
                return expect(chord.key).toEqual(key);
              });
              it('The chord ' + key + chord.suffix + ' should have a defined suffix property', function () {
                return expect(chord.suffix).toBeDefined();
              });
              it('The chord ' + key + chord.suffix + ' should have a list of positions', function () {
                return expect(chord.positions).toBeInstanceOf(Array);
              });
            });

            describe('Positions', function () {
              return chord.positions.map(function (position, index) {
                it('The ' + index + ' position fingers array should have 6 values', function () {
                  return expect(position.fingers.length).toEqual(6);
                });
                it('The ' + index + ' position fingers array should have values lower than 5', function () {
                  return expect(Math.max.apply(Math, _toConsumableArray(position.fingers))).toBeLessThan(5);
                });
                it('The ' + index + ' position fingers array should have values higher or equal to 0', function () {
                  return expect(Math.min.apply(Math, _toConsumableArray(position.fingers))).toBeGreaterThanOrEqual(0);
                });
              });
            });
          });
        });
      });
    });
  });
});