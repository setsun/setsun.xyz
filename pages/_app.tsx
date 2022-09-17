import { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from 'styled-components'
import GlobalStyle from '../components/GlobalStyle';

const theme: DefaultTheme = {
  colors: {
    primary: '#0d1117'
  }
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
