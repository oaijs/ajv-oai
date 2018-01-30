const { AjvOAI } = require('./helpers');

describe('byte', () => {
  it('encoded string, should be true', async () => {
    const ajv = new AjvOAI();
    const validator = ajv.compile({ type: 'string', format: 'byte' });

    expect(validator('5L2g5aW95ZWK')).toBe(true);
    expect(validator('MTIz')).toBe(true);
    expect(validator('QCPvv6VAI++/pQ==')).toBe(true);
  });

  it('not encoded string, should be false', async () => {
    const ajv = new AjvOAI();
    const validator = ajv.compile({ type: 'string', format: 'byte' });

    expect(validator('1')).toBe(false);
    expect(validator('abc')).toBe(false);
  });
});
