import React from 'react';
import { Paper } from '@mui/material';
import { MultiSelectAutoComplete } from '../TableSection/FilterInputComponents';
import { chartType } from '../../pages/VisualisationSection';

interface VisualisationSettingsBoxProps {
    setChartType: React.Dispatch<React.SetStateAction<chartType>>
}

const VisualisationSettingsBox: React.FC<VisualisationSettingsBoxProps> = () => {


    return (
        <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                <h3 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Principal Component Analysis</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4em", padding: "1em", height: "100%", overflowY: "auto" }}>
                <p style={{ fontSize: "0.9em" }}>
                    En PCA analyser tager adskillige faktorer i betragtning og reducerer dimensionenen/antallet af akser, så man kan
                    visualisere data på en mere overskuelig måde.
                    <br></br>
                    <br></br>
                    Vælg først de faktorer, der skal repræsentere den ene akse,
                    og derefter de faktorer, der skal repræsentere den anden akse.
                    Derefter vil du kunne få et visuelt overblik over
                    sammenhængen mellem den første gruppe af faktorer og den anden gruppe af faktorer.
                </p>
                <MultiSelectAutoComplete
                    value={[]}
                    collection={[]}
                    selectLabel="1. Akse"
                    selectPlaceholder="1. Akse"
                    setFilters={() => console.log("hello")}
                    identifier="x_axis"
                />
                <MultiSelectAutoComplete
                    value={[]}
                    collection={[]}
                    selectLabel="2. Akse"
                    selectPlaceholder="2. Akse"
                    setFilters={() => console.log("hello")}
                    identifier="y_axis"
                />
            </div>
        </Paper>
    );
};

export default VisualisationSettingsBox