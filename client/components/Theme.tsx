import createTheme from '@mui/material/styles/createTheme';

export const themeOptions = createTheme({
  palette: {
    primary: {
      main: '#9a4119',
    },
    secondary: {
      main: '#b5870a',
    },
    background: {
      default: '#FDF3E0',
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            border: '10px solid #9a4119',
          }
        }
      }
    }
  }

});