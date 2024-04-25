export function arrayBind<T = unknown>(array: T[]): string {
  return '(' + array.map(() => '?').join(',') + ')';
}
