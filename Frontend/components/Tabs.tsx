import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DataTableSection from '@frontend/pages/DataTableSection';
import { Education } from '../../src/types';

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
    possibleEducations: Education[];
}


export default function BasicTabs(props: TabsProps) {
    const { setIsModalOpen, possibleEducations } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', padding: 0 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center", padding: 0 }}>
                <Tabs sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ width: "200px", fontWeight: "bolder", fontSize: "larger", paddingTop: "14px" }} label="Uddannelser" {...a11yProps(0)} />
                    <Tab sx={{ width: "200px", fontWeight: "bolder", fontSize: "larger", paddingTop: "14px" }} label="Visualisering" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <DataTableSection setIsModalOpen={setIsModalOpen} possibleEducations={possibleEducations} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Visualisering
            </CustomTabPanel>

        </Box>
    );
}