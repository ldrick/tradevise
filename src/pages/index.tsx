import type { NextPage } from 'next';

import { Card } from '@src/components/Card';
import { Table } from '@src/components/Table';
import { useMomentum } from '@src/hooks/useMomentum';
import { momentum } from '@src/utils/momentum';

const displayPercentage = (value?: number): string =>
  value === undefined ? '' : `${(value * 100).toFixed(2)}%`;

const Home: NextPage = () => {
  const { data, isLoading, error } = useMomentum();

  if (error) {
    return <div>Failed to load.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap">
      {data?.map((d) => {
        const momentum3 = momentum(d.data.c, 3);
        const momentum6 = momentum(d.data.c, 6);
        const rows = d.data.t.map((date, index) => ({
          key: date,
          columns: [
            { key: 'date', content: date },
            { key: '3months', content: displayPercentage(momentum3.at(index)) },
            { key: '6months', content: displayPercentage(momentum6.at(index)) },
          ],
        }));
        return (
          <Card key={d.symbol} title={`${d.symbol} - ${d.displayName}`}>
            <Table
              head={[
                { key: 'date', title: 'Date' },
                { key: '3months', title: '3 Months' },
                { key: '6months', title: '6 Months' },
              ]}
              rows={rows}
            />
          </Card>
        );
      })}
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
