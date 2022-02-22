import { AlphaVantageMonthlyPrices } from './data';

export type NormalizedData = {
  o: number[];
  h: number[];
  l: number[];
  c: number[];
  v: number[];
  t: string[];
};

const isCompleteMonth = (date: string) => {
  const actualDate = new Date(date);
  const lastDayOfMonth = new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, 0);
  return lastDayOfMonth.getDate() * 0.9 <= actualDate.getDate();
};

export const normalizeData = (data: AlphaVantageMonthlyPrices): NormalizedData =>
  Object.entries(data['Monthly Time Series']).reduce(
    (reducer, [key, value], index) => {
      if (index === 0 && !isCompleteMonth(key)) {
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
