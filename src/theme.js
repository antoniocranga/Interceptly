import { Inter } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

export const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif']
});
const boxShadow = 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px;';
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
            dark: '#FF9B3E'
        },
        error: {
            main: '#ff4d4f',
            light: '#ff4d4f',
            dark: '#A61D23'
        },
        warning: {
            main: '#fadb14',
            light: '#fadb14',
            dark: '#D89612'
        },
        success: {
            main: '#52c41a',
            light: '#52c41a',
            dark: '#49AA19'
        },
        background: {
            main: '#F5F5F5',
            light: '#F5F5F5',
            dark: '#262626'
        },
        divider: {
            main: '#F0F0F0',
            light: '#F0F0F0',
            dark: '#313131'
        }
    },
    typography: {
        fontFamily: inter.style.fontFamily
    },
    shape: {
        borderRadius: 8
    },
    components: {
        MuiMenu: {
            styleOverrides: {
                root: {
                    boxShadow: 'none'
                },
                paper: {
                    marginTop: '2px',
                    padding: '2px 8px 2px 8px',
                    minWidth: 160,
                    color: 'white',
                    backgroundImage: 'none',
                    backgroundColor: '#fff',
                    border: '1px solid',
                    borderColor: grey[300],
                    boxShadow: 'none',

                    '& .MuiMenuItem-root': {
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        borderRadius: '6px',
                        '&:hover': {
                            backgroundColor: '#F3F6F9'
                        },
                        '&:focus': {
                            backgroundColor: '#F3F6F9'
                        },
                        '&.Mui-selected': {
                            fontWeight: 500,
                            color: '#0072E5',
                            backgroundColor: 'rgba(194, 224, 255, 0.6)'
                        }
                    }
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    boxShadow: boxShadow
                }
            }
        }
    },
    custom: {
        customBoxShadow: {
            boxShadow: boxShadow
        }
    }
});

export default theme;
