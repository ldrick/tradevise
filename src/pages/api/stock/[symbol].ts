import { promises as fs } from 'fs';

import { NextApiRequest, NextApiResponse } from 'next';

import {
  alphavantage,
  AlphaVantageMonthlyPrices,
  normalizeData,
  NormalizedData,
} from '@src/utils/alphavantage';

const readFromFs = <T>(file: string): Promise<T> =>
  fs.readFile(file, 'utf-8').then((data) => JSON.parse(data) as T);

const handler = async (req: NextApiRequest, res: NextApiResponse<NormalizedData>) => {
  const {
    query: { symbol, src },
  } = req;

  if (Array.isArray(symbol) || Array.isArray(src)) {
    res.status(422);
  } else {
    const rawData =
      src === 'api'
        ? (await alphavantage({ key: process.env.API_KEY || '' }).data.monthly(symbol)).data
        : await readFromFs<AlphaVantageMonthlyPrices>(`src/data/${symbol}.json`);

    res.status(200).json(normalizeData(rawData));
  }
};

// eslint-disable-next-line import/no-default-export
export default handler;
