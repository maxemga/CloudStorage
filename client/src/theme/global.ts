import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto-Regular';
    src: url('Roboto-Bold.woff2') format(woff2);
  }

  * {
    margin: 0;
    padding: 0;
    font-family: "Roboto-Regular";
    box-sizing: border-box;
  }

  body {
    height: auto;
  }

  a {
    text-decoration: none;
  }

  input {
    outline: none;
  }

  buttom {
    outline: none;
  }
`
