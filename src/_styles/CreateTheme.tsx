import { createTheme } from '@mui/material/styles';

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
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                asterisk: {
                    color: '#ff0000', // Red color for asterisk
                },
            },
        },
    },
});

export { lightTheme, darkTheme };
