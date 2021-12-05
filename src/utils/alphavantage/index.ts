import { data } from './data';

const alphavantage = (config: { key: string }) => {
  // Add the base url for submodules to use.
  const conf = Object.assign(config, {
    url: `https://www.alphavantage.co/query?apikey=${config.key}&`,
  });

  // Include all the submodules.
  return {
    data: data(conf),
  };
};

export { alphavantage };
export { normalizeData } from './normalizeData';
export type { NormalizedData } from './normalizeData';
export type { AlphaVantageMonthlyPrices } from './data';
