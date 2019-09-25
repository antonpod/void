import { Atom, Thing, Reducer } from './types';

export const reduce: Reducer = (thing: string) => (
  state: Thing,
  atom: Atom,
): Thing => {
  switch (atom.type) {
    case `${thing}.create`:
      return (atom[thing] as unknown) as Thing;
    default:
  }

  return state;
};
