const { AjvOAI, loadSchema } = require('./helpers');


describe('OpenAPI 3.1 break changes', () => {
  it('valid should be ok', async () => {
    const ajvoai = new AjvOAI({ oasVer: '3.1', loadSchema });

    expect(ajvoai.compile({ type: 'string' })(null)).toBe(false);
    expect(ajvoai.compile({ type: ['string', 'null'] })(null)).toBe(true);

    expect(ajvoai.compile({ type: 'integer', exclusiveMinimum: 100, })(99)).toBe(false);
    expect(ajvoai.compile({ type: 'integer', exclusiveMinimum: 100, })(100)).toBe(false);
    expect(ajvoai.compile({ type: 'integer', exclusiveMinimum: 100, })(101)).toBe(true);

    expect(ajvoai.compile({ type: 'integer', exclusiveMaximum: 100, })(99)).toBe(true);
    expect(ajvoai.compile({ type: 'integer', exclusiveMaximum: 100, })(100)).toBe(false);
    expect(ajvoai.compile({ type: 'integer', exclusiveMaximum: 100, })(101)).toBe(false);
  });
});

describe('compileAsync', () => {
  it('2.0-3.0 compileAsync', async () => {
    const ajvoai = new AjvOAI({ oasVer: '3.0', loadSchema });

    return ajvoai.compileAsync({ type: 'string' }).then((validate) => {
      expect(validate(null)).toBe(false);
    })
  })

  it('2.0-3.1 compileAsync', async () => {
    const ajvoai = new AjvOAI({ oasVer: '3.1', loadSchema });

    return ajvoai.compileAsync({ type: 'string' }).then((validate) => {
      expect(validate(null)).toBe(false);
    })
  })
})
