import uuid from 'uuid/v4';
import { Atom, Thing } from './types';
import { reduce } from './reducers';

export class Void {
  private atoms: Atom[] = [];

  constructor(private readonly type: string) {}

  static spawn = (type: string): Void => new Void(type);
  static atom = (type: string): Atom => ({
    type: `${type}.create`,
    thing: {
      id: uuid(),
    },
  });

  public fill(atoms: Atom[] = []): Void {
    this.atoms.push(...atoms);

    return this;
  }

  public thing(): Thing {
    return this.atoms.reduce(
      (res: Thing, atom: Atom) => reduce(this.type)(res, atom),
      null,
    );
  }
}
