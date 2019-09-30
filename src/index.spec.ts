import uuid from 'uuid/v4';
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
      const id = uuid();
      const v = Void.spawn('thing');

      expect(v.fill([v.atom().create(id)]).thing()).toEqual({
        id,
      });
    });

    test('filled void can create and update a Thing', () => {
      const id = uuid();
      const v = Void.spawn('thing');

      expect(
        v
          .fill([v.atom().create(id), v.atom().update(id, 'name', 'New name')])
          .thing(),
      ).toEqual({
        id,
        name: 'New name',
      });
    });

    test('filled void can create and destroy a Thing', () => {
      const id = uuid();
      const v = Void.spawn('thing');

      expect(
        v.fill([v.atom().create(id), v.atom().delete(id)]).thing(),
      ).toEqual({
        id,
        isDeleted: true,
      });
    });
  });
});
