import { AlphaVantageMonthlyPrices } from './data';

export type NormalizedData = {
  o: number[];
  h: number[];
  l: number[];
  c: number[];
  v: number[];
  t: string[];
};

export const normalizeData = (data: AlphaVantageMonthlyPrices): NormalizedData =>
  Object.entries(data['Monthly Time Series']).reduce(
    (reducer, [key, value], index) => {
      if (index === 0 && new Date(key).getDate() < 25) {
        return reducer;
      }
      if (index > 11) {
        return reducer;
      }
      return Object.assign(reducer, {
        o: [...reducer.o, +value['1. open']],
        h: [...reducer.h, +value['2. high']],
        l: [...reducer.l, +value['3. low']],
        c: [...reducer.c, +value['4. close']],
        v: [...reducer.v, +value['5. volume']],
        t: [...reducer.t, key],
      });
    },
    { o: [], h: [], l: [], c: [], v: [], t: [] },
  );
