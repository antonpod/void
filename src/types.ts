export interface Atom {
  id: string;
  type: string;
  [key: string]: any;
}

export interface Thing {
  id: string;
  name: string;
  isDeleted?: boolean;
}

export interface Reducer<T = Thing> {
  (thing: string): (state: T, atom: Atom) => T;
}
