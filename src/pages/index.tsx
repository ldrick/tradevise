import type { NextPage } from 'next';

import { StockCard } from '@src/components/StockCard';
import { AppConfig } from 'config';

const Home: NextPage = () => (
  <div className="flex flex-wrap">
    {AppConfig.momentum.map(({ displayName, symbol }) => (
      <StockCard key={symbol} displayName={displayName} symbol={symbol} />
    ))}
  </div>
);

// eslint-disable-next-line import/no-default-export
export default Home;
