import React, { useState } from 'react';
import { TextField, TextFieldProps, styled, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyledTextField } from '../../../_styles/input';



interface TextInputProps extends Omit<TextFieldProps, 'variant'> {
    label: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    inputType?: 'text' | 'password';
}

const TextInput: React.FC<TextInputProps> = ({ label, onChange, onBlur, inputType = 'text', ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isPasswordInput = inputType === 'password';

    return (
        <StyledTextField
            variant="outlined"
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            type={isPasswordInput && !showPassword ? 'password' : 'text'}
           
            InputProps={{
                endAdornment: isPasswordInput ? (
                    <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ) : null,
            }}
            {...props}
        />
    );
};

export default TextInput;
