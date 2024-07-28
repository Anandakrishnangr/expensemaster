import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MapComponent from '../map/mapComponent';
import { Avatar, Button, Menu, MenuItem, Switch, Tab, Typography, styled } from '@mui/material';
import { Logout, Password } from '@mui/icons-material';
import axiosInstance from '../../_utils/axios';
import { persistor } from '../../redux/store';
import { showSuccessSnackbar } from '../snackbar/Snackbar';
import { useDispatch } from 'react-redux';
import { openChangePassword } from '../../redux/modalSlice';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 58,
    height: 32,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 30,
        height: 30,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

interface Labtbs {
    theme: () => void;
}

export default function LabTabs({ theme }: Labtbs) {
    let location = useLocation();
    console.log(location);
    const [value, setValue] = React.useState(location.pathname);
    let navigate = useNavigate();


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue);
        setValue(newValue);
        navigate(newValue, {
            state: {
                newValue
            }
        });
    };

    const TabContent = [
        { label: "DashBoard", value: "/" },
        { label: "Transactions", value: "/transactions" },
        { label: "Manage", value: "/manage" }
    ];
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Add your logout logic here
        axiosInstance.post("/api/logout/")
            .then(res => {
                persistor.purge(); //
                localStorage.clear()
                showSuccessSnackbar("Signed out !")

            })
        handleClose();
    };
    let dispatch = useDispatch()
    const handleChangePassword = () => {
        // Add your logout logic here
        console.log('Change Password');
        dispatch(openChangePassword({ open: true }))
        handleClose();
    };
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', alignItems: "center", justifyContent: "space-between", display: "flex" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "28px" }} style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', color: "#FFD700", marginLeft: "15px" }}><i>X</i></Typography><span> pence Tracker</span>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            {TabContent.map((tab, index) => (
                                <Tab key={index} value={tab.value} label={tab.label}></Tab>
                            ))}
                        </TabList>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <MaterialUISwitch onChange={theme} />
                        <Avatar sx={{ height: "28px", width: "28px" }}
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                        />
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{ pt: 0, pb: 0 }}
                    >
                        <MenuItem sx={{ pt: 0, pb: 0 }} onClick={handleLogout}>
                            <Button sx={{ m: 0, p: 0 }} startIcon={<Logout />}>Logout</Button>
                        </MenuItem>
                        <MenuItem sx={{ pt: 0, pb: 0 }} onClick={handleChangePassword}>
                            <Button sx={{ m: 0, p: 0 }} startIcon={<Password />}>Change Password</Button>
                        </MenuItem>
                    </Menu>
                </Box>
                {TabContent.map((tab, index) => (
                    <TabPanel key={index} value={tab.value}>{tab.label}</TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}

interface TabProps {
    item: {
        label: string;
        value: string;
    };
    index: number;
}

const TabComponent: React.FC<TabProps> = ({ item, index }) => {
    const { label, value } = item;
    console.log(label, value, index);
    return <Tab label={label} value={value} />;
};
