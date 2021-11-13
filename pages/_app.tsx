import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Layout } from '../components/layout';

const Posts = React.createContext({});

export default ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);
