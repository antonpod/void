import { Void } from '.';

describe('Void', () => {
  test('defined', () => {
    expect(Void).toBeDefined();
  });

  describe('Spawn', () => {
    test('void can be spawned', () => {
      expect(Void.spawn('thing')).toBeInstanceOf(Void);
    });
  });

  describe('Thing', () => {
    test('empty void creates a null Thing', () => {
      expect(Void.spawn('thing').thing()).toBeNull();
    });

    test('filled void can create a Thing', () => {
      expect(
        Void.spawn('thing')
          .fill([Void.atom('thing')])
          .thing(),
      ).toEqual({
        id: expect.any(String),
      });
    });
  });
});
