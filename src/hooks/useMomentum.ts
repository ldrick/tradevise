import axios from 'axios';
import useSWR from 'swr';

import { MomentumData } from '@src/pages/api/momentum';

export const useMomentum = () => {
  const { data, error } = useSWR<MomentumData, Error>('/api/momentum/', (url: string) =>
    axios.get<MomentumData>(url).then((d) => d.data),
  );
  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
