import { Atom, Thing, Reducer } from './types';

const reducer: Reducer = <T extends Thing>(type: string) => (
  state: T,
  atom: Atom,
): Thing => {
  if (state && state.id !== atom.id) {
    return state;
  }

  const [thing, action, prop] = atom.type.split('.');

  if (thing !== type) {
    return state;
  }

  switch (action) {
    case 'create':
      state = atom[type];
      break;
    case `delete`:
      state = { ...state, isDeleted: true };
      break;
    case `update`:
      state = { ...state, [prop]: atom[prop] };
      break;
    default:
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
