export function constant<T>(val: T) {
  return (..._: any[]) => val
}
