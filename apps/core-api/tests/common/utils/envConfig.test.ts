describe('Environment Configuration', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('should correctly get a string environment variable', () => {
    process.env.TEST_VAR = 'test';

    expect(process.env['TEST_VAR']).toBe('test');
  });
});
