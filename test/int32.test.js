const { AjvOAI } = require('./helpers');

describe('int32', () => {
  it('integer and in range, should be true', async () => {
    const ajv = new AjvOAI();
    const validator = ajv.compile({ type: 'integer', format: 'int32' });

    expect(validator(-2147483648)).toBe(true);
    expect(validator(-9234234)).toBe(true);
    expect(validator(0)).toBe(true);
    expect(validator(1)).toBe(true);
    expect(validator(1.0)).toBe(true);
    expect(validator(999)).toBe(true);
    expect(validator(912312399)).toBe(true);
    expect(validator(2147483647)).toBe(true);
  });

  it('integer and out of range, should be false', async () => {
    const ajv = new AjvOAI();
    const validator = ajv.compile({ type: 'integer', format: 'int32' });

    expect(validator(-2147483649)).toBe(false);
    expect(validator(2147483648)).toBe(false);
  });

  it('not integer, should be false', async () => {
    const ajv = new AjvOAI();
    const validator = ajv.compile({ type: 'integer', format: 'int32' });

    expect(validator(1.1)).toBe(false);
    expect(validator(-923423.4)).toBe(false);
    expect(validator(-1.1)).toBe(false);
    expect(validator('a')).toBe(false);
    expect(validator(new Date())).toBe(false);
    expect(validator({})).toBe(false);
    expect(validator([])).toBe(false);
  });
});
