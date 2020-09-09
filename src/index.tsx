import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import history from 'config/history';
import WebFont from 'webfontloader';
import theme from 'styles/theme';
import * as serviceWorker from 'serviceWorker';
import { HomePage } from 'pages/HomePage';
import { routes } from 'config';
import { RepoDetailsPage } from 'pages/RepoDetailsPage';

WebFont.load({
  google: {
    families: ['Lato:300,400,700', 'sans-serif'],
  },
});

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Route exact path={routes.root()} component={HomePage} />
        <Route path={routes.repo()} component={RepoDetailsPage} />
      </Router>
    </ThemeProvider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
