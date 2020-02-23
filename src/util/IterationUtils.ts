/**
 * I added TypeScript typings to William's takeIterator()
 * @author William Casarin {@link https://github.com/jb55}
 * @license MIT
 * @see {@link https://github.com/jb55/take-iterator/blob/master/index.js} */
export function* takeIterator<T>(xs: IterableIterator<T>, n: number): IterableIterator<T> {
  if (n === 0) return;
  let i = 0;
  for (let x of xs) {
    yield x;
    if (++i === n) break;
  }
}
