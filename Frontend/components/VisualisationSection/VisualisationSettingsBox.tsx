import React, { useEffect, useState } from 'react';
import { Autocomplete, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField } from '@mui/material';
import { MultiSelectAutoComplete } from '../TableSection/FilterInputComponents';
import { useServer } from '@backend/server/useServer';
import { Education, EducationGroup, PropertyNames } from 'types'
import { ConvertPropertyToName, EducationPropertyNames, PropertiesToPropertyNames } from '../../utilities/helper'
export enum ChartType {scatter="scatter", bar="bar", radar="radar"};

type VisualisationSettingsBoxProps = {
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    chartType: ChartType,
    setChartType: React.Dispatch<React.SetStateAction<ChartType>>,
    setProperties: React.Dispatch<React.SetStateAction<string[]>>,
    educationGroups: EducationGroup[],
    setEducationGroups: React.Dispatch<React.SetStateAction<EducationGroup[]>>
}

//let educations: Education[] = [];
let normalizedEducations: Education[] = [];
let educationProperties: string[] = [];

const VisualisationSettingsBox: React.FC<VisualisationSettingsBoxProps> = ({ setUpdate, chartType, setChartType, setProperties, educationGroups, setEducationGroups }) => {
    //const { getPCAData } = useServer();

    /*const calculatePCA = async () => {
        const PCA_request: PCAData = {
            principalComponents = {
                x_axis: ["x1", "x2", "x3"],
                y_axis: ["y1", "y2", "y3"]
            }
        }
        const response = await getPCAData(PCA_request);
        const data = await response.text();
        (data);
        // add toast
        toast.info(data);
    }*/

    //const groupedEducationTitles: string[] = getGroupedEducations.map(education => education.title);
    const [groupedEducations, setGroupedEducations] = useState<EducationGroup[]>([]);

    const { getGroupedEducations, getNormalizedEducations } = useServer();
    

    useEffect(() => {
        getGroupedEducations().then((data) => {
            setGroupedEducations(data);
        });
        getNormalizedEducations().then((data) => {
            normalizedEducations = data;
        })
    }, []);



    let groupedEducationTitles = groupedEducations.map((education) => education.title);
    //let educationPropertiesTitles = educationProperties.map((education) => education.title);

    const handleChartChange = (event: SelectChangeEvent) => {
        setChartType(event.target.value as ChartType);
    };

    const scatterPlotSettingBox = (
        <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                <h3 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Principal Component Analysis</h3>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="select-graph">Graf</InputLabel>
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
                    Scatterplot
                    <br />
                    <br />
                    En PCA analyser tager adskillige faktorer i betragtning og reducerer dimensionenen/antallet af akser, så man kan
                    visualisere data på en mere overskuelig måde.
                    <br />
                    <br />
                    PCA visualiseringen er baseret ud fra dine filtre indstillinger og svar på quizzen i 'udannelser' siden.
                </p>
            </div>

        </Paper>
    )

    const barPlotSettingBox = (
        <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                <h3 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Bar graf</h3>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="select-graph">Graf</InputLabel>
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
                    Det her er en bar graf, her kan du se forskellige egenskaber for op til 3 uddannelser sat imod hinanden.
                </p>
                <Autocomplete
                    onChange={(event: any, newValue: string | null) => {
                        console.log("1: ", newValue);
                        let education = normalizedEducations.find((edu) => edu.title == newValue);
                        educationGroups[0] = education as EducationGroup;
                        setEducationGroups(educationGroups);
                        setUpdate(true);
                    }}
                    disablePortal
                    id="udd1"
                    options={groupedEducationTitles}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Uddannelse" />}
                />
                <Autocomplete
                    onChange={(event: any, newValue: string | null) => {
                        console.log("2: ", newValue);
                        let education = normalizedEducations.find((edu) => edu.title == newValue);
                        educationGroups[1] = education as EducationGroup;
                        setEducationGroups(educationGroups);
                        setUpdate(true);
                    }}
                    disablePortal
                    id="udd2"
                    options={groupedEducationTitles}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Uddannelse" />}
                />
                <Autocomplete
                    onChange={(event: any, newValue: string | null) => {
                        console.log("3: ", newValue);
                        let education = normalizedEducations.find((edu) => edu.title == newValue);
                        educationGroups[2] = education as EducationGroup;
                        setEducationGroups(educationGroups);
                        setUpdate(true);
                    }}
                    disablePortal
                    id="udd2"
                    options={groupedEducationTitles}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Uddannelse" />}
                />
                <MultiSelectAutoComplete
                    givenValue={[]}
                    collection={Object.keys(EducationPropertyNames) ?? []}
                    setProperties={setProperties}
                    selectLabel="Egenskaber"
                    selectPlaceholder="Egenskaber"
                    identifier="Egenskaber"
                    getOptionsLabel={ConvertPropertyToName}
                />
            </div>
        </Paper>
    );

    const radarPlotSettingBox = (
        <Paper elevation={2} style={{ marginRight: "1em", height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                <h3 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Radar graf</h3>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="select-graph">Graf</InputLabel>
                    <Select
                        labelId="select-graph"
                        id="select-graph"
                        value={chartType}
                        label="Chart"
                        onChange={handleChartChange}
                    >
                        <MenuItem key={"scatter"} value="scatter">Scatter</MenuItem> 
                        <MenuItem key={"bar"} value="bar">Bar</MenuItem>
                        <MenuItem key={"radar"} value="radar">Radar</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", height: "80%", flexDirection: "column", padding: "1em", overflowY: "scroll" }}>
                <p style={{ fontSize: "0.9em", marginBottom: "0px" }}>
                    Her kan du se forskellige uddannelsers egenskaber på en radar graf.
                </p>
                <Autocomplete
                    onChange={(event: any, newValue: string | null) => {
                        console.log("1: ", newValue);
                        let education = normalizedEducations.find((edu) => edu.title == newValue);
                        educationGroups[0] = education as EducationGroup;
                        setEducationGroups(educationGroups);
                        setUpdate(true);
                    }}
                    disablePortal
                    id="udd1"
                    options={groupedEducationTitles}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Uddannelse" />}
                />
                <Autocomplete
                    onChange={(event: any, newValue: string | null) => {
                        console.log("2: ", newValue);
                        let education = normalizedEducations.find((edu) => edu.title == newValue);
                        educationGroups[1] = education as EducationGroup;
                        setEducationGroups(educationGroups);
                        setUpdate(true);
                    }}
                    disablePortal
                    id="udd2"
                    options={groupedEducationTitles}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Uddannelse" />}
                />
                <Autocomplete
                    onChange={(event: any, newValue: string | null) => {
                        console.log("3: ", newValue);
                        let education = normalizedEducations.find((edu) => edu.title == newValue);
                        educationGroups[2] = education as EducationGroup;
                        setEducationGroups(educationGroups);
                        setUpdate(true);
                    }}
                    disablePortal
                    id="udd3"
                    options={groupedEducationTitles}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Uddannelse" />}
                />
                <MultiSelectAutoComplete
                    givenValue={[]}
                    collection={Object.keys(EducationPropertyNames) ?? []}
                    setProperties={setProperties}
                    selectLabel="Egenskaber"
                    selectPlaceholder="Egenskaber"
                    identifier="Egenskaber"
                    getOptionsLabel={ConvertPropertyToName}
                />
            </div>
        </Paper>
    );

    return (
        ((chartType == ChartType.scatter) && scatterPlotSettingBox)
        ||
        ((chartType == ChartType.bar) && barPlotSettingBox)
        ||
        ((chartType == ChartType.radar) && radarPlotSettingBox)

    );
};

export default VisualisationSettingsBox