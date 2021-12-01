import { ReactNode } from 'react';

import { AppConfig } from 'config';

import { Meta } from './Meta';
import { PageLoader } from './PageLoader';

type LayoutProps = {
  children: ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div className="antialiased bg-primary text-white flex flex-col items-stretch min-h-full">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <PageLoader />
      <header />
      <main>{children}</main>
      <footer />
      <style global jsx>
        {`
          html,
          body,
          body > div:first-child,
          div#__next {
            height: 100%;
            width: 100%;
          }
          ,
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
    </div>
  );
};

export { Layout };
