import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton';

interface ButtonProps {
    onClick?: () => void;
    loading?: boolean;
    label?: string
}
const Button: React.FC<ButtonProps> = ({ onClick, loading, label }) => {
    return (
        <LoadingButton onClick={onClick} loading={loading}  variant='contained' >{label}</LoadingButton>
    )
}

export default Button