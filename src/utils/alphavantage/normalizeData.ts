import { AlphaVantageMonthlyPrices } from './data';

export type NormalizedData = {
  o: number[];
  h: number[];
  l: number[];
  c: number[];
  v: number[];
  t: Date[];
};

export const normalizeData = (data: AlphaVantageMonthlyPrices): NormalizedData =>
  Object.entries(data['Monthly Time Series']).reduce(
    (reducer, [key, value]) =>
      Object.assign(reducer, {
        o: [...reducer.o, +value['1. open']],
        h: [...reducer.h, +value['2. high']],
        l: [...reducer.h, +value['3. low']],
        c: [...reducer.h, +value['4. close']],
        v: [...reducer.h, +value['5. volume']],
        t: [...reducer.t, new Date(key)],
      }),
    { o: [], h: [], l: [], c: [], v: [], t: [] },
  );
