const AjvOAI = require('../lib/ajv-oai');
const RANGES = require('../lib/constants');


function loadSchema(uri) {
  return request.json(uri).then(function (res) {
    if (res.statusCode >= 400) throw new Error("Loading error: " + res.statusCode)
    return res.body
  })
}

module.exports = {
  AjvOAI,
  RANGES,
  loadSchema,
};
