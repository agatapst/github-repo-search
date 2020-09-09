import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import WebFont from 'webfontloader';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { HomePage } from './pages/HomePage';
import theme from './styles/theme';

WebFont.load({
  google: {
    families: ['Lato:300,400,700', 'sans-serif'],
  },
});

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
