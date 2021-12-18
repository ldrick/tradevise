function* chunk<T>(data: ReadonlyArray<T>, length: number): IterableIterator<ReadonlyArray<T>> {
  for (let i = 0; i <= data.length - length; i += 1) {
    yield data.slice(i, i + length);
  }
}

const isNumber = (value: unknown): value is number => Number.isFinite(value);

const momentum = (data: ReadonlyArray<number>, length = 6) =>
  [...chunk(data, length)].map((c) => {
    const newest = c.at(0);
    const oldest = c.at(-1);
    return isNumber(newest) && isNumber(oldest) ? (newest - oldest) / oldest : 0;
  });

export { momentum, chunk };
