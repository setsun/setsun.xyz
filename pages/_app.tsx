import '../styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components'
import GlobalStyle from '../components/GlobalStyle';
import Layout from '../components/Layout';

const theme: DefaultTheme = {
  colors: {
    primary: '#0d1117'
  }
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <Analytics />
    </ThemeProvider>
  );
};

export default App;
