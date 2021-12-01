import type { AppProps } from 'next/app';

import { Layout } from 'components/Layout';

import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

// eslint-disable-next-line import/no-default-export
export default MyApp;
