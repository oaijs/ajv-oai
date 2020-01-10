const { AjvOAI } = require('./helpers');

describe('issues#4', () => {
  it('valid object missing property, should be failed', async () => {
    const ajv = new AjvOAI();
    const validator = ajv.compile({
      type: 'object',
      required: ['foo'],
      properties: {
        foo: {
          type: 'string',
        },
        bar: {
          type: 'string',
        },
      },
    });

    expect(validator({
      bar: 'some value',
    })).toBe(false);
    expect(validator.errors).toEqual([{
      keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: { missingProperty: 'foo' },
      message: "should have required property 'foo'",
    }]);
  });
});
