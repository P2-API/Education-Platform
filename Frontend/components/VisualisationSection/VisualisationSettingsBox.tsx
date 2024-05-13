import React from 'react';
import { Paper } from '@mui/material';
import { MultiSelectAutoComplete } from '../TableSection/FilterInputComponents';
import { chartType } from '../../pages/VisualisationSection';
import { PCAData, useServer } from '@backend/server/useServer';
import { toast } from 'sonner';

interface VisualisationSettingsBoxProps {
    setChartType: React.Dispatch<React.SetStateAction<chartType>>
}

const VisualisationSettingsBox: React.FC<VisualisationSettingsBoxProps> = () => {

    const { getPCAData } = useServer();

    const calculatePCA = async () => {
        const PCA_request: PCAData = {
            x_axis: ["x1", "x2", "x3"],
            y_axis: ["y1", "y2", "y3"]
        }
        const response = await getPCAData(PCA_request);
        const data = await response.text();
        console.log(data);
        // add toast
        toast.info(data);
    }



    return (
        <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                <h3 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Principal Component Analysis</h3>
                <button className='primary-button' style={{ width: "150px", marginRight: "1em" }} onClick={calculatePCA} >Test server</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", height: "80%", flexDirection: "column", padding: "1em" }}>
                <p style={{ fontSize: "0.9em", marginBottom: "0px" }}>
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
                <button className='primary-button' style={{ width: "150px" }}  >Beregn</button>
            </div>
        </Paper>
    );
};

export default VisualisationSettingsBox