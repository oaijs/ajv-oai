const { AjvOAI } = require('./helpers');

describe('float', () => {
  it('float and in range, should be true', async () => {
    const ajv = new AjvOAI();
    const validator = ajv.compile({ type: 'number', format: 'float' });

    expect(validator(3.4E+38)).toBe(true);
    expect(validator(-9234234)).toBe(true);
    expect(validator(0)).toBe(true);
    expect(validator(1)).toBe(true);
    expect(validator(1.0)).toBe(true);
    expect(validator(999)).toBe(true);
    expect(validator(912312399)).toBe(true);
    expect(validator(-3.4E+38)).toBe(true);
  });

  it('float and out of range, should be false', async () => {
    const ajv = new AjvOAI();
    const validator = ajv.compile({ type: 'number', format: 'float' });

    expect(validator(Number.NEGATIVE_INFINITY)).toBe(false);
    expect(validator(Number.POSITIVE_INFINITY)).toBe(false);
  });

  it('not float, should be false', async () => {
    const ajv = new AjvOAI();
    const validator = ajv.compile({ type: 'number', format: 'float' });

    expect(validator('a')).toBe(false);
    expect(validator(new Date())).toBe(false);
    expect(validator({})).toBe(false);
    expect(validator([])).toBe(false);
  });
});
