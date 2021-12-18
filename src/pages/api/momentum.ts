import { promises as fs } from 'fs';

import type { NextApiRequest, NextApiResponse } from 'next';

import { AppConfig } from 'config';
import {
  alphavantage,
  NormalizedData,
  normalizeData,
  AlphaVantageMonthlyPrices,
} from 'utils/alphavantage';

export type MomentumData = {
  displayName: string;
  symbol: string;
  data: NormalizedData;
}[];

const readFromFs = <T>(file: string): Promise<T> =>
  fs.readFile(file, 'utf-8').then((data) => JSON.parse(data) as T);

const momentum = async (req: NextApiRequest, res: NextApiResponse<MomentumData>) => {
  const {
    query: { src },
  } = req;
  return Promise.all(
    AppConfig.momentum.map(async ({ displayName, symbol }) => {
      const rawData =
        src === 'api'
          ? (await alphavantage({ key: process.env.API_KEY || '' }).data.monthly(symbol)).data
          : await readFromFs<AlphaVantageMonthlyPrices>(`src/data/${symbol}.json`);
      return { displayName, symbol, data: normalizeData(rawData) };
    }),
  ).then((data) => {
    res.status(200).json(data);
  });
};

// eslint-disable-next-line import/no-default-export
export default momentum;
