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

    test('filled void can create many Things', () => {
      const id1 = uuid();
      const id2 = uuid();
      const v = Void.spawn('thing');

      expect(
        v.fill([v.atom().create(id1), v.atom().create(id2)]).things(),
      ).toEqual([{ id: id1 }, { id: id2 }]);
    });

    test('filled void can create many Things without the deleted ones', () => {
      const id1 = uuid();
      const id2 = uuid();
      const v = Void.spawn('thing');

      expect(
        v
          .fill([
            v.atom().create(id1),
            v.atom().delete(id1),
            v.atom().create(id2),
          ])
          .things(),
      ).toEqual([{ id: id2 }]);
    });
  });
});
