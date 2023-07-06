import '../styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />

      <Analytics />
    </Layout>
  );
};

export default App;
