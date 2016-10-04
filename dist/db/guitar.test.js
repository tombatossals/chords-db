'use strict';

var _guitar = require('./guitar');

var _guitar2 = _interopRequireDefault(_guitar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Guitar Chords', function () {
  describe('Strings', function () {
    return it('Should have 6 strings', function () {
      return expect(_guitar2.default.strings).toEqual(6);
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
      var chords = _guitar2.default.chords[key];
      chords.map(function (chord) {
        return it('The chord ' + key + chord.suffix + ' should have a defined key property', function () {
          return expect(chord.key).toEqual(key);
        });
      });

      chords.map(function (chord) {
        return it('The chord ' + key + chord.suffix + ' should have a defined suffix property', function () {
          return expect(chord.suffix).toBeDefined();
        });
      });

      chords.map(function (chord) {
        return it('The chord ' + key + chord.suffix + ' should have a list of positions', function () {
          return expect(chord.positions).toBeInstanceOf(Array);
        });
      });
    });
  });
}); /* global it, describe, expect */