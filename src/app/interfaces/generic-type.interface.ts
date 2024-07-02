export interface GenericObject {
  [key: string]: string | number | null | undefined;
}

export interface GenericId {
  id: number;
}

export interface NumberKeyValue<T> {
  [key: number]: T;
}
