import React, { useState, ChangeEvent } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { openChangePassword } from '../../redux/modalSlice';
import { RootState } from '../../redux/store';
import axiosInstance from '../../_utils/axios';
import { showSuccessSnackbar, showWarningSnackbar } from '../snackbar/Snackbar';


export const ChangePasswordModal: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    let Dispatch = useDispatch()
    let open = useSelector((state: RootState) => state.modal.changePassword)
    const handleClose = () => Dispatch(openChangePassword({ open: false }))
    const handleChangePassword = async () => {
        if (!currentPassword.length) {
            setError('Enter the current password ');
            return;
        }
        if (newPassword.length < 8) {
            setError('Enter a new password with 8 character long');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }

        try {
            const response = await axiosInstance.post('/api/change-password/', {
                new_password: newPassword,
                old_password: currentPassword,
            });

            if (response.status === 200) {
                showSuccessSnackbar('Password changed successfully!');
                handleClose();
            }
        } catch (error) {

            if (axios.isAxiosError(error)) {
                const errorResponse = error.response as { data: { old_password?: string[] } };

                const errorMessage = errorResponse.data.old_password
                    ? errorResponse.data.old_password.join(', ')
                    : 'Error changing password. Please try again.';
                showWarningSnackbar(`Error: ${errorMessage}`);
            } else {
                showWarningSnackbar('An unexpected error occurred.');
            }
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setter(event.target.value);
    };

    return (
        <Dialog open={open.open} onClose={handleClose}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your current password, new password, and confirm the new password.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Current Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={currentPassword}
                    onChange={handleInputChange(setCurrentPassword)}
                />
                <TextField
                    margin="dense"
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={newPassword}
                    onChange={handleInputChange(setNewPassword)}
                />
                <TextField
                    margin="dense"
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={confirmPassword}
                    onChange={handleInputChange(setConfirmPassword)}
                />
                {error && <Box sx={{ color: 'red', mb: 2 }}>{error}</Box>}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleChangePassword} color="primary" variant="contained">
                    Change Password
                </Button>
            </DialogActions>
        </Dialog>
    );
};


