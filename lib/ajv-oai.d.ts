import ajv from 'ajv';

declare var ajvOAI: {
  new (options?: ajv.Options & { jsonSchema?: string }): ajv.Ajv;
};

export = ajvOAI;
