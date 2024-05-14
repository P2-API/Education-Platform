import React from 'react';
import { FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';
import { MultiSelectAutoComplete } from '../TableSection/FilterInputComponents';
import { useServer } from '@backend/server/useServer';
import { PCAData } from 'types'
import { toast } from 'sonner';

export enum ChartType {scatter="scatter", bar="bar", radar="radar"};

type VisualisationSettingsBoxProps = {
    chartType: ChartType,
    setChartType: React.Dispatch<React.SetStateAction<ChartType>>
}


const VisualisationSettingsBox: React.FC<VisualisationSettingsBoxProps> = ({ chartType, setChartType }) => {

    const { getPCAData } = useServer();

    const calculatePCA = async () => {
        const PCA_request: PCAData = {
            x_axis: ["x1", "x2", "x3"],
            y_axis: ["y1", "y2", "y3"]
        }
        const response = await getPCAData(PCA_request);
        const data = await response.text();
        (data);
        // add toast
        toast.info(data);
    }

    const handleChartChange = (event: SelectChangeEvent) => {
        setChartType(event.target.value as ChartType);
    };


    return (
        <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                <h3 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Principal Component Analysis</h3>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="select-graph">Graph</InputLabel>
                <Select
                    labelId="select-graph"
                    id="select-graph"
                    value={chartType}
                    label="Chart"
                    onChange={handleChartChange}
                >
                    <MenuItem value="scatter">Scatter</MenuItem>
                    <MenuItem value="bar">Bar</MenuItem>
                    <MenuItem value="radar">Radar</MenuItem>
                </Select>
                </FormControl>
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
                    setFilters={() => ("hello")}
                    identifier="x_axis"
                />
                <MultiSelectAutoComplete
                    value={[]}
                    collection={[]}
                    selectLabel="2. Akse"
                    selectPlaceholder="2. Akse"
                    setFilters={() => ("hello")}
                    identifier="y_axis"
                />
                <button className='primary-button' style={{ width: "150px" }}  >Beregn</button>
            </div>
        </Paper>
    );
};

export default VisualisationSettingsBox