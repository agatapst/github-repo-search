import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import WebFont from 'webfontloader';

import App from './App';
import * as serviceWorker from './serviceWorker';

WebFont.load({
  google: {
    families: ['Lato:300,400,700', 'sans-serif'],
  },
});

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Lato', 'Helvetica Neue', 'Arial', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
