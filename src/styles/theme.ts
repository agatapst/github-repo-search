import { createMuiTheme } from '@material-ui/core/styles';

const { breakpoints } = createMuiTheme();

export default createMuiTheme({
  palette: {
    primary: {
      main: '#EC615B',
    },
    secondary: {
      main: '#553CD0',
    },
    text: {
      primary: '#202020',
      secondary: '#292929',
      disabled: '#6B6B6B',
    },
  },
  typography: {
    fontFamily: ['Lato', 'Helvetica Neue', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: 28,
      fontWeight: 500,
      [breakpoints.up('sm')]: {
        fontSize: 42,
      },
    },
    h2: {
      fontSize: 22,
      fontWeight: 500,
      [breakpoints.up('sm')]: {
        fontSize: 28,
      },
    },
    body1: {
      color: '#4A4C4F',
      fontSize: 14,
      fontWeight: 300,
      [breakpoints.up('sm')]: {
        fontSize: 16,
      },
    },
    body2: {
      fontSize: 10,
      fontWeight: 300,
      color: '#4A4C4F',
      [breakpoints.up('sm')]: {
        fontSize: 12,
      },
    },
  },
});
