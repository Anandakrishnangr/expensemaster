import { TextField, styled } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        color: theme.palette.text.primary,
        transform: 'translate(14px, 16px) scale(1)',
        transition: theme.transitions.create(['transform'], {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut,
        }),
    },
    '& .MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.grey[400],
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));