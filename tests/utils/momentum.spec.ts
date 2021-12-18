import { chunk, momentum } from '@src/utils/momentum';

describe('chunk', () => {
  test.each([
    {
      a: [],
      l: 2,
      r: [],
    },
    {
      a: [1],
      l: 2,
      r: [],
    },
    {
      a: [1, 2, 3, 4, 5],
      l: 2,
      r: [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
      ],
    },
  ])('creates series of chunks from array $a', ({ a, l, r }) => {
    expect([...chunk(a, l)]).toStrictEqual(r);
  });
});

describe('momentum', () => {
  test.each([{ s: [5, 2, 4, 4, 1], l: 3, r: [0.25, -0.5, 3] }])(
    'calculates Momentum on series $s',
    ({ s, l, r }) => {
      expect(momentum(s, l)).toStrictEqual(r);
    },
  );
});
