import React from 'react';
import VisualisationSettingsBox, { ChartType } from "@frontend/components/VisualisationSection/VisualisationSettingsBox"
import Visualisation from '@frontend/components/VisualisationSection/Visualisation';
import { rankedDataInfo } from '@frontend/components/Tabs';

type VisualisationSectionProps = {
    rankedDataInfo: rankedDataInfo;
}

const VisualisationSection: React.FC<VisualisationSectionProps> = ({ rankedDataInfo }) => {
    const [chartType, setChartType] = React.useState<ChartType>(ChartType.scatter);
    const [properties, setProperties] = React.useState<string[]>([])

    console.log("Visualization has access to: ", rankedDataInfo)

    return (

        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "412px", marginRight: "1em" }}>
                <VisualisationSettingsBox chartType={chartType} setChartType={setChartType} setProperties={setProperties} />
            </div>
            <div style={{ width: "69%" }}>
                <Visualisation chartType={chartType} properties={properties} />
            </div>
        </div>
    );
};

export default VisualisationSection;