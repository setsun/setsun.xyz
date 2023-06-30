import { Noto_Sans, Antonio } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';

// If loading a variable font, you don't need to specify the font weight
const antonio = Antonio({ subsets: ['latin'] })

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: ${antonio.style.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  input,
  textarea {
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export default GlobalStyle;
