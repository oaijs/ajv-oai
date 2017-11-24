const RANGES = require('./constants');

/**
 * OpenAPI 2.0 data types format
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types
 */

/**
 * Check that the data is integer and int32
 * @param {number} data
 * @returns {boolean}
 */
function int32(data) {
  const mayInt32 = Number(data);

  if (
    Number.isInteger(mayInt32) &&
    mayInt32 <= RANGES.int32.max &&
    mayInt32 >= RANGES.int32.min
  ) return true;

  return false;
}

/**
 * Check that the data is integer and int64
 * @param {number} data
 * @returns {boolean}
 */
function int64(data) {
  const mayInt64 = Number(data);

  if (
    Number.isInteger(mayInt64) &&
    mayInt64 <= RANGES.int64.max &&
    mayInt64 >= RANGES.int64.min
  ) return true;

  return false;
}

/**
 * Check that the data is float
 * @param {number} data
 * @returns {boolean}
 */
function float(data) {
  const mayFloat = Number(data);

  if (
    mayFloat <= RANGES.float.max &&
    mayFloat >= RANGES.float.min
  ) return true;

  return false;
}

/**
 * Check that the data is double
 * @param {number} data
 * @returns {boolean}
 */
function double(data) {
  const mayDouble = Number(data);

  if (
    mayDouble <= RANGES.double.max &&
    mayDouble >= RANGES.double.min
  ) return true;

  return false;
}

/**
 * Check that the data is string and base64 encoded characters.
 * @param {string} data
 * @returns {boolean}
 */
function byte(data) {
  // Token from: https://github.com/chriso/validator.js/blob/master/src/lib/isBase64.js
  const notBase64 = /[^A-Z0-9+\/=]/i;

  const len = data.length;
  if (!len || len % 4 !== 0 || notBase64.test(data)) {
    return false;
  }
  const firstPaddingChar = data.indexOf('=');
  return firstPaddingChar === -1 ||
    firstPaddingChar === len - 1 ||
    (firstPaddingChar === len - 2 && data[len - 1] === '=');
}

/**
 * Check that the data is string and any sequence of octets.
 * @todo
 * @param {string} data
 * @returns {boolean}
 */
function binary(data) {
  throw new Error('Not implemented');
}

module.exports = {
  int32,
  int64,
  float,
  double,
  byte,
  binary,
};
