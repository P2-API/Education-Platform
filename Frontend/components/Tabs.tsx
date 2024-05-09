import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DataTableSection from '@frontend/pages/DataTableSection';
import React from 'react';

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

type TabsProps = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function BasicTabs(props: TabsProps) {
    const { setIsModalOpen } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };




    return (
        <Box sx={{ width: '100vw', height: "75%" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center", }}>
                <Tabs sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ width: "200px", fontWeight: "bolder", fontSize: "larger", paddingTop: "14px", height: "100%" }} label="Uddannelser" {...a11yProps(0)} />
                    <Tab sx={{ width: "200px", fontWeight: "bolder", fontSize: "larger", paddingTop: "14px" }} label="Visualisering" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <DataTableSection setIsModalOpen={setIsModalOpen} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Visualisering
            </CustomTabPanel>

        </Box>
    );
}