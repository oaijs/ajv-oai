const { AjvOAI } = require('./helpers');

describe('issues#9', () => {
  it('valid should be ok', async () => {
    const ajvoai = new AjvOAI({ coerceTypes: false, nullable: true });

    expect(ajvoai.compile({ type: 'number' })('42')).toBe(false);
    expect(ajvoai.compile({ type: 'string' })(42)).toBe(false);
    expect(ajvoai.compile({ type: 'string' })(null)).toBe(false);
    expect(ajvoai.compile({ type: 'string', nullable: true })(null)).toBe(true);
    expect(ajvoai.compile({ type: 'string', nullable: false })(null)).toBe(false);
  });
});
