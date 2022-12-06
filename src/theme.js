import { Inter } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const inter = Inter({
  weight: ['300', '400', '500','600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1890ff',
      dark: '#187CDC',
      light: '#1890ff'
    },
    secondary: {
      main: '#FF8718',
      light: '#FF8718',
      dark:'#FF9B3E'
    },
    error: {
      main: '#ff4d4f',
      light: '#ff4d4f',
      dark: '#A61D23'
    },
    warning: {
      main: '#fadb14',
      light: '#fadb14',
      dark: '#D89612',
    },
    success: {
      main: '#52c41a',
      light: '#52c41a',
      dark: '#49AA19'
    },
    background:{
      main: '#F5F5F5',
      light: '#F5F5F5',
      dark: '#262626'
    },
    divider:{
      main: '#F0F0F0',
      light: '#F0F0F0',
      dark: '#313131'
    },
    
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;
