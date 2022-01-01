import axios from 'axios';
import useSWR from 'swr';

import { NormalizedData } from '@src/utils/alphavantage';

export const useStock = (symbol: string) => {
  const { data, error } = useSWR<NormalizedData, Error>(`/api/stock/${symbol}`, (url: string) =>
    axios.get<NormalizedData>(url).then((d) => d.data),
  );
  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
