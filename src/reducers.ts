import { Atom, Thing, Reducer } from './types';

export const one: Reducer = (thing: string) => (
  state: Thing,
  atom: Atom,
): Thing => {
  if (state && state.id !== atom.id) {
    return state;
  }

  switch (atom.type) {
    case `${thing}.create`:
      state = atom[thing] as Thing;
      break;
    case `${thing}.delete`:
      state = {
        ...state,
        isDeleted: true,
      };
      break;
    default:
      if (atom.type.startsWith(`${thing}.update.`)) {
        const prop = atom.type.split('.').pop();

        state = {
          ...state,
          [prop]: atom[prop],
        };
      }
  }

  return state;
};
