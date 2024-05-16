import React from 'react';
import VisualisationSettingsBox, { ChartType } from "@frontend/components/VisualisationSection/VisualisationSettingsBox"
import Visualisation from '@frontend/components/VisualisationSection/Visualisation';


const VisualisationSection: React.FC = () => {
    const [chartType, setChartType] = React.useState<ChartType>(ChartType.scatter);
    const [properties, setProperties] = React.useState<string[]>([])

    return (

        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "412px", marginRight: "1em" }}>
                <VisualisationSettingsBox chartType={chartType} setChartType={setChartType} setProperties={setProperties} />
            </div>
            <div style={{ width: "69%" }}>
                <Visualisation chartType={chartType} properties={properties}/>
            </div>
        </div>
    );
};

export default VisualisationSection;