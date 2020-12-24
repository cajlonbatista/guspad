import { createMuiTheme } from '@material-ui/core/styles';

export const login = createMuiTheme({
  palette: {
    primary: {
      main: '#EBB110',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontWeightBold: 600,
  }
});

export const chipTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF5F5F",
      contrastText: "#303030",
    },
  },
  typography: {
    fontFamily: [
      'Inter'
    ].join(','),
    fontSize: 14
  },
});
