import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MapComponent from '../map/mapComponent';
import { Tab } from '@mui/material';

export default function LabTabs() {
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

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {TabContent.map((tab, index) => (
                            <Tab key={index} value={tab.value} label={tab.label}></Tab>
                        ))}
                    </TabList>
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
