import type { NextApiRequest, NextApiResponse } from 'next';

import { AppConfig } from 'config';
import {
  alphavantage,
  NormalizedData,
  normalizeData,
  AlphaVantageMonthlyPrices,
} from 'utils/alphavantage';

type MomentumData = {
  displayName: string;
  symbol: string;
  data: NormalizedData;
}[];

const readFromFs = <T>(url: string, config: RequestInit = {}): Promise<T> =>
  fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as T);

const momentum = async (req: NextApiRequest, res: NextApiResponse<Promise<MomentumData>>) => {
  const {
    query: { src },
  } = req;
  const data = Promise.all(
    AppConfig.momentum.map(async ({ displayName, symbol }) => {
      const rawData =
        src === 'api'
          ? (await alphavantage({ key: process.env.API_KEY || '' }).data.monthly(symbol)).data
          : await readFromFs<AlphaVantageMonthlyPrices>(`../../data/${symbol}.json`);
      return { displayName, symbol, data: normalizeData(rawData) };
    }),
  );

  res.status(200).json(data);
};

// eslint-disable-next-line import/no-default-export
export default momentum;
