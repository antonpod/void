import { Atom, Thing, Reducer } from './types';

const reducer: Reducer = <T extends Thing>(type: string) => (
  state: T,
  atom: Atom,
): Thing => {
  if (state && state.id !== atom.id) {
    return state;
  }

  switch (atom.type) {
    case `${type}.create`:
      state = atom[type];
      break;
    case `${type}.delete`:
      state = { ...state, isDeleted: true };
      break;
    default:
      if (atom.type.startsWith(`${type}.update.`)) {
        const prop = atom.type.split('.').pop();

        state = { ...state, [prop]: atom[prop] };
      }
  }

  return state;
};

export const one = (type: string) => (atoms: Atom[]) => {
  const reduce = reducer(type);

  return atoms.reduce((res: Thing, atom: Atom) => reduce(res, atom), null);
};

export const many = (type: string) => (atoms: Atom[]) => {
  const reduce = reducer(type);

  return Object.values(
    atoms.reduce((res: Record<string, Thing>, atom: Atom) => {
      res[atom.id] = reduce(res[atom.id], atom);
      return res;
    }, {}),
  ).filter(thing => !thing.isDeleted);
};
