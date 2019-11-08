const { AjvOAI } = require('./helpers');

describe('Use custom meta Schema', () => {
  it('should allow to use a custom ajv schema from the ajv list', async () => {
    const ajv = new AjvOAI({ metaSchema: 'json-schema-draft-07' });
    const validator = ajv.compile({
      type: 'object',
      properties: {
        street_address: {
          type: 'string',
        },
        country: {
          enum: ['United States of America', 'Canada'],
        },
      },
      if: {
        properties: { country: { const: 'United States of America' } },
      },
      then: {
        properties: { postal_code: { pattern: '[0-9]{5}(-[0-9]{4})?' } },
      },
      else: {
        properties: {
          postal_code: { pattern: '[A-Z][0-9][A-Z] [0-9][A-Z][0-9]' },
        },
      },
    });

    expect(
      validator({
        country: 'United States of America',
        postal_code: '12345-12345',
      }),
    ).toBe(true);
  });

  it('should throw an error if meta schema is not supported', async () => {
    expect(
      () => new AjvOAI({ metaSchema: 'json-schema-draft-nop-existing' }),
    ).toThrow(
      new Error(
        `Meta schema json-schema-draft-nop-existing not supported. Cannot find module 'ajv/lib/refs/json-schema-draft-nop-existing.json' from 'ajv-oai.js'`,
      ),
    );
  });
});
