const Ajv = require('ajv');

const formats = require('./custom-format');

function AjvOAI(opts) {
  opts = Object.assign({
    format: 'full',
    coerceTypes: true,
    unknownFormats: 'ignore',
    useDefaults: true,
  }, opts);
  const ajv = new Ajv(opts);

  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
  ajv.addFormat('int32', { type: 'number', validate: formats.int32 })
  ajv.addFormat('int64', { type: 'number', validate: formats.int64 })
  ajv.addFormat('float', { type: 'number', validate: formats.float })
  ajv.addFormat('double', { type: 'number', validate: formats.double })
  ajv.addFormat('byte', { type: 'string', validate: formats.byte })

  return ajv;
}

module.exports = AjvOAI;
