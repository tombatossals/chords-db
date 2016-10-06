'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./6');

var _2 = _interopRequireDefault(_);

var _maj = require('./maj7');

var _maj2 = _interopRequireDefault(_maj);

var _major = require('./major');

var _major2 = _interopRequireDefault(_major);

var _sus = require('./sus2');

var _sus2 = _interopRequireDefault(_sus);

var _sus3 = require('./sus4');

var _sus4 = _interopRequireDefault(_sus3);

var _minor = require('./minor');

var _minor2 = _interopRequireDefault(_minor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_2.default, _maj2.default, _major2.default, _sus2.default, _sus4.default, _minor2.default];