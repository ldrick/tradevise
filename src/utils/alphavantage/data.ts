import axios from 'axios';

export type AlphaVantageType = 'TIME_SERIES_MONTHLY' | 'TIME_SERIES_MONTHLY_ADJUSTED';
export type AlphaVantageConfig = {
  url: string;
};
export type AlphaVantageParameters = {
  symbol: string;
  function: AlphaVantageType;
};
export type AlphaVantageMonthlyPrices = {
  'Meta Data': {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Time Zone': string;
  };
  'Monthly Time Series': {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };
};

const fetch = (config: AlphaVantageConfig) => (params: AlphaVantageParameters) =>
  axios.get<AlphaVantageMonthlyPrices>(config.url, { params });

const series = (type: AlphaVantageType) => (config: AlphaVantageConfig) => (symbol: string) => {
  const params = {
    symbol,
    function: type,
  };
  return fetch(config)(params);
};

const data = (config: AlphaVantageConfig) => ({
  monthly: series('TIME_SERIES_MONTHLY')(config),
  monthly_adjusted: series('TIME_SERIES_MONTHLY_ADJUSTED')(config),
});

export { data };
