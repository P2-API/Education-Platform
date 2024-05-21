import React from 'react';
import VisualisationSettingsBox, { ChartType } from "@frontend/components/VisualisationSection/VisualisationSettingsBox"
import Visualisation from '@frontend/components/VisualisationSection/Visualisation';
import { rankedDataInfo } from '@frontend/components/Tabs';
import { EducationGroup } from '@src/types';

type VisualisationSectionProps = {
    rankedDataInfo: rankedDataInfo;
}

const VisualisationSection: React.FC<VisualisationSectionProps> = ({ rankedDataInfo }) => {
    const [chartType, setChartType] = React.useState<ChartType>(ChartType.scatter);
    const [properties, setProperties] = React.useState<string[]>([]);
    const [educationGroups, setEducationGroups] = React.useState<EducationGroup[]>([]);
    console.log("Visualization has access to: ", rankedDataInfo)
    const rankedDat = rankedDataInfo;
    console.log("educationGroups inside of general section", educationGroups)

    // Very cursed update function
    const [update, setUpdate] = React.useState<boolean>(false);
    if (update) {
        setUpdate(false);

        return (

            <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
                <div style={{ width: "30%", height: "100%", minWidth: "412px", marginRight: "1em" }}>
                    <VisualisationSettingsBox setUpdate={setUpdate} chartType={chartType} setChartType={setChartType} setProperties={setProperties} educationGroups={educationGroups} setEducationGroups={setEducationGroups}/>
                </div>
                <div style={{ width: "69%" }}>
                    <Visualisation setUpdate={setUpdate} chartType={chartType} properties={properties} rankedDataInfo={rankedDat} educationGroups={educationGroups} />
                </div>
            </div>
        );
    }

    return (

        <div style={{ display: "flex", height: "80vh", width: "100%", maxWidth: "100vw" }}>
            <div style={{ width: "30%", height: "100%", minWidth: "412px", marginRight: "1em" }}>
                <VisualisationSettingsBox setUpdate={setUpdate} chartType={chartType} setChartType={setChartType} setProperties={setProperties} educationGroups={educationGroups} setEducationGroups={setEducationGroups}/>
            </div>
            <div style={{ width: "69%" }}>
                <Visualisation setUpdate={setUpdate} chartType={chartType} properties={properties} rankedDataInfo={rankedDat} educationGroups={educationGroups} />
            </div>
        </div>
    );
};

export default VisualisationSection;