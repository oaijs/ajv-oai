import * as ajv from 'ajv';

declare var ajvOAI: {
  new(options?: ajv.Options & { oasVer?: string }): ajv.Ajv;
};

export = ajvOAI;
