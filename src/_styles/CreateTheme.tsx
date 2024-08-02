import { createTheme } from '@mui/material/styles';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#ffffff',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                asterisk: {
                    color: '#ff0000', // Red color for asterisk
                },
            },
        },

    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            // default: '#282828',
            // paper: '#1d1d1d',
            default: 'black',
            paper: 'black',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    // backgroundColor: '#121212',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                asterisk: {
                    color: '#ff0000', // Red color for asterisk
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: `
    inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075),
    0 0 0 1px hsla(0, 0%, 0%, 0.05),
    0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
    0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
    0 3.5px 6px hsla(0, 0%, 0%, 0.09)`,
                }
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: `
    inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075),
    0 0 0 1px hsla(0, 0%, 0%, 0.05),
    0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
    0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
    0 3.5px 6px hsla(0, 0%, 0%, 0.09)`,
                }
            }
        },

    },
});

export { lightTheme, darkTheme };
