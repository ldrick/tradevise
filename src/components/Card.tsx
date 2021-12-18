import { ReactNode } from 'react';

type CardProps = {
  title?: ReactNode;
  children?: ReactNode;
};

const Card = (props: CardProps) => {
  const { title, children } = props;

  return (
    <div className="block p-6 rounded-lg shadow-lg">
      {title && <h5 className="text-xl leading-tight font-medium mb-2">{title}</h5>}
      {children && <div className="text-base mb-4">{children}</div>}
    </div>
  );
};

Card.defaultProps = {
  title: undefined,
  children: undefined,
};

export { Card };
