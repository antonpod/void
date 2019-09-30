import { Atom, Thing } from './types';
import { one } from './reducers';

export class Void {
  private atoms: Atom[] = [];

  constructor(private readonly type: string) {}

  static spawn = (type: string): Void => new Void(type);
  static atom = <T extends Thing>(type: string) => ({
    create: (id: string) => ({
      id,
      type: `${type}.create`,
      [type]: { id },
    }),
    update: <P extends keyof T>(id: string, prop: P, value: T[P]) => ({
      id,
      type: `${type}.update.${prop}`,
      [prop]: value,
    }),
    delete: (id: string) => ({
      id,
      type: `${type}.delete`,
    }),
  });

  public atom<T extends Thing>() {
    return Void.atom<T>(this.type);
  }

  public fill(atoms: Atom[] = []): Void {
    this.atoms.push(...atoms);

    return this;
  }

  public thing(): Thing {
    return this.atoms.reduce(
      (res: Thing, atom: Atom) => one(this.type)(res, atom),
      null,
    );
  }
}
