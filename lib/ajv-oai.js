const Ajv = require('ajv');

const validator = require('./format-validator');

function AjvOAI(optsIn) {
  const opts = Object.assign({
    schemaId: 'id',
    format: 'full',
    coerceTypes: true,
    unknownFormats: 'ignore',
    useDefaults: true,
  }, optsIn);
  const ajv = new Ajv(opts);

  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

  ajv.addFormat('int32', { type: 'number', validate: validator.int32 });
  ajv.addFormat('int64', { type: 'number', validate: validator.int64 });
  ajv.addFormat('float', { type: 'number', validate: validator.float });
  ajv.addFormat('double', { type: 'number', validate: validator.double });
  ajv.addFormat('byte', { type: 'string', validate: validator.byte });

  return ajv;
}

module.exports = AjvOAI;
