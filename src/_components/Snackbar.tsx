import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

type SnackbarPosition = {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
};

type SnackbarRefType = {
    showSuccess: (message: string, horizontal?: SnackbarPosition['horizontal'], vertical?: SnackbarPosition['vertical']) => void;
    showError: (message: string, horizontal?: SnackbarPosition['horizontal'], vertical?: SnackbarPosition['vertical']) => void;
    showWarning: (message: string, horizontal?: SnackbarPosition['horizontal'], vertical?: SnackbarPosition['vertical']) => void;
    handleClose: () => void;
} | null;

let snackbarRef: SnackbarRefType = null;

function SnackbarComponent() {
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [position, setPosition] = useState<SnackbarPosition>({
        vertical: 'top', horizontal: 'center'
    });

    const handleOpen = (
        message: string,
        horizontal: SnackbarPosition['horizontal'] = 'center',
        vertical: SnackbarPosition['vertical'] = 'top',
        type: AlertColor
    ) => {
        setText(message);
        setSeverity(type);
        setOpen(true);
        setPosition({
            vertical: vertical,
            horizontal: horizontal,
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    snackbarRef = {
        showSuccess: (message, horizontal, vertical) => handleOpen(message, horizontal, vertical, 'success'),
        showError: (message, horizontal, vertical) => handleOpen(message, horizontal, vertical, 'error'),
        showWarning: (message, horizontal, vertical) => handleOpen(message, horizontal, vertical, 'warning'),
        handleClose: () => handleClose()
    };

    return (
        <Snackbar
            anchorOrigin={position}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                variant="filled"
                severity={severity}
                sx={{ width: '100%' }}
            >
                {text}
            </Alert>
        </Snackbar>
    );
}

export function showSuccessSnackbar(
    message: string,
    horizontal: SnackbarPosition['horizontal'] = 'center',
    vertical: SnackbarPosition['vertical'] = 'top'
) {
    snackbarRef && snackbarRef.showSuccess(message, horizontal, vertical);
    setTimeout(() => {
        snackbarRef && snackbarRef.handleClose();
    }, 5000);
}

export function showErrorSnackbar(
    message: string,
    horizontal: SnackbarPosition['horizontal'] = 'center',
    vertical: SnackbarPosition['vertical'] = 'top'
) {
    snackbarRef && snackbarRef.showError(message, horizontal, vertical);
    setTimeout(() => {
        snackbarRef && snackbarRef.handleClose();
    }, 5000);
}

export function showWarningSnackbar(
    message: string,
    horizontal: SnackbarPosition['horizontal'] = 'center',
    vertical: SnackbarPosition['vertical'] = 'top'
) {
    snackbarRef && snackbarRef.showWarning(message, horizontal, vertical);
    setTimeout(() => {
        snackbarRef && snackbarRef.handleClose();
    }, 5000);
}

export function closeSnackbar() {
    snackbarRef && snackbarRef.handleClose();
}

export default SnackbarComponent;
