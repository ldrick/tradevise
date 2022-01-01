import { useStock } from '@src/hooks/useStock';
import { momentum } from '@src/utils/momentum';

import { Card } from './Card';
import { Table } from './Table';

const displayPercentage = (value?: number): string =>
  value === undefined ? '' : `${(value * 100).toFixed(2)}%`;

type StockCardProps = {
  displayName: string;
  symbol: string;
  period?: number;
};

const StockCard = (props: StockCardProps) => {
  const { symbol, displayName, period } = props;

  const { data, isLoading, error } = useStock(symbol);

  if (error) {
    return <div>Failed to load.</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const momentum3 = momentum(data.c, 3);
  const momentum6 = momentum(data.c, 6);

  return (
    <Card title={`${symbol} - ${displayName}`}>
      <Table
        head={[
          { key: 'date', title: 'Date' },
          { key: '3months', title: '3 Months' },
          { key: '6months', title: '6 Months' },
        ]}
        rows={data?.t
          .filter((date, index) => {
            if (index === 0) {
              const actualDate = new Date(date);
              const lastDayOfMonth = new Date(
                actualDate.getFullYear(),
                actualDate.getMonth() + 1,
                0,
              );
              return lastDayOfMonth.getDate() * 0.9 <= actualDate.getDate();
            }
            return true;
          })
          .filter((_date, index) => index < (period || 6))
          .map((date, index) => ({
            key: date,
            columns: [
              { key: 'date', content: date },
              { key: '3months', content: displayPercentage(momentum3.at(index)) },
              { key: '6months', content: displayPercentage(momentum6.at(index)) },
            ],
          }))}
      />
    </Card>
  );
};

StockCard.defaultProps = {
  period: 6,
};

export { StockCard };
