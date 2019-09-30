import { Atom, Thing, Reducer } from './types';

export const one: Reducer = <T extends Thing>(type: string) => (
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
