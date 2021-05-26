const Ajv = require('ajv/dist/2019').default;

const draft2019 = require('./migrate');
const validator = require('./format-validator');

// TODO bigint support https://github.com/ajv-validator/ajv/issues/1116

module.exports = class AjvX extends Ajv {
  constructor({ oasVer = '3.0', ...args } = {}) {
    super(Object.assign({
      coerceTypes: false,
      useDefaults: true,
    }, args));

    this.oasVer = oasVer;
    this.addFormat('int32', { type: 'number', validate: validator.int32 });
    this.addFormat('int64', { type: 'number', validate: validator.int64 });
    this.addFormat('float', { type: 'number', validate: validator.float });
    this.addFormat('double', { type: 'number', validate: validator.double });
    this.addFormat('byte', { type: 'string', validate: validator.byte });
  }
  compile(args) {
    if (this.oasVer === '3.1') {
      return super.compile(args);
    }

    return super.compile(draft2019(args));
  }
  compileAsync(args) {
    if (this.oasVer === '3.1') {
      return super.compileAsync(args);
    }

    return super.compileAsync(draft2019(args));
  }
};
