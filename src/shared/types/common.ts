export type Position = {
  readonly x: number;
  readonly y: number;
};

export type Size = {
  readonly width: number;
  readonly height: number;
};

export type Result<T, E = Error> =
  | { readonly success: true; readonly value: T }
  | { readonly success: false; readonly error: E };
