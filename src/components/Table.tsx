import { ReactNode } from 'react';

type TableProps = {
  head: ReadonlyArray<{ key: string; title: ReactNode }>;
  rows: ReadonlyArray<{
    key: string;
    columns: ReadonlyArray<{
      key: string;
      content: ReactNode;
      position?: 'left' | 'right' | 'center';
    }>;
  }>;
};

const Table = (props: TableProps) => {
  const { head, rows } = props;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  {head.map(({ key, title }) => (
                    <th
                      key={key}
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left whitespace-nowrap"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ key, columns }) => (
                  <tr className="bg-gray-100 border-b" key={key}>
                    {columns.map((col) => {
                      const position = col.position || 'right';
                      return (
                        <td
                          key={col.key}
                          className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-${position}`}
                        >
                          {col.content}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Table };
