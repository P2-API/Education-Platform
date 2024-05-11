import React from 'react';
import VisualisationSettingsBox from "@frontend/components/VisualisationSection/VisualisationSettingsBox"
import Visualisation from "@frontend/components/VisualisationSection/Visualisation"
import { Education } from '@src/types';

interface VisualisationSectionProps {

};

export type chartType = "scatter" | "bar" | "radar" | "";

const VisualisationSection: React.FC<VisualisationSectionProps> = () => {


    const [chartType, setChartType] = React.useState<chartType>("");


    return (
        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "412px", marginRight: "1em" }}>
                <VisualisationSettingsBox setChartType={setChartType} />
            </div>
            <div style={{ width: "69%" }}>
                <Visualisation chartType={chartType} />
            </div>
        </div>
    );
};

export default VisualisationSection;