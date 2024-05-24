import React, { useContext, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Plot from 'react-plotly.js';

import { ChartType } from "./VisualisationSettingsBox"
import { useServer } from '@backend/server/useServer';
import { QuizInfoContext, rankedDataInfo, filtersContext } from '@frontend/components/Tabs';
import { Education, EducationGroup } from '@src/types';
import { PropertiesToPropertyNames } from '../../utilities/helper'


interface VisualisationProps {
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    chartType: ChartType,
    properties: string[],
    rankedDataInfo: rankedDataInfo,
    educationGroups: EducationGroup[]
}

type pcaScatterData = {
    xValues: number[],
    yValues: number[]
    textValues: string[]
    xAxisTitle?: string
    yAxisTitle?: string
}

let normalizedEducations: Education[] = [];

const Visualisation: React.FC<VisualisationProps> = ({ chartType, properties, rankedDataInfo, educationGroups }) => {

    const [, setEducationProperties] = useState<string[]>([]);
    const quizAnswerState = useContext(QuizInfoContext);
    const filterInfo = useContext(filtersContext);

    const { getEducationsProperties, getNormalizedEducations } = useServer();
    useEffect(() => {
        getEducationsProperties().then((data) => {
            setEducationProperties(data);
        })
        getNormalizedEducations().then((data) => {
            normalizedEducations = data;
        })
    }, []);

    const { getPCAData } = useServer();
    const [pcaData, setPCAData] = useState<pcaScatterData>();
    useEffect(() => {
        getPCAData(quizAnswerState.quizData, filterInfo.filters).then((data) => {
            setPCAData({
                xValues: data?.points.map((point) => parseFloat(point.x.toFixed(2))),
                yValues: data?.points.map((point) => parseFloat(point.y.toFixed(2))),
                textValues: data?.points.map((point) => point.education.title),

                xAxisTitle: data?.principalComponents.xAxis.composition.slice(0, 3).map((component) => component.variable + ": " + parseFloat(component.coeff.toFixed(2))).join(" + ") + " ...",
                yAxisTitle: data?.principalComponents.yAxis.composition.slice(0, 3).map((component) => component.variable + ": " + parseFloat(component.coeff.toFixed(2))).join(" + ") + " ..."
            })
        })
    }, [quizAnswerState.quizData, chartType]);
    const rankedData = rankedDataInfo;
    const rankIndex = rankedData?.rankedData ? rankedData?.rankedData.index : 366;
    const scatterPlot = (
        <Paper elevation={2} style={{ height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ display: "grid", gap: "1em", height: "95%", }}>
                <Plot
                    data={[
                        {
                            x: pcaData?.xValues,
                            y: pcaData?.yValues,
                            text: pcaData?.textValues,
                            mode: "markers",
                            type: "scatter",
                            marker: {
                                size: 10,
                                sizemode: "area",
                                color: pcaData?.textValues.map((_text, index) => (index < rankIndex ? "green" : "red"))
                            },
                            hovertemplate:
                                "<b>%{text}</b><br><br>" +
                                "Hjalfedildur: %{y}<br>" +
                                "Kramsemar: %{x}<br>" +
                                "<extra></extra>"
                        }
                    ]}
                    layout={{
                        title: "PCA Analyse",
                        xaxis: {
                            title: pcaData?.xAxisTitle,
                        },
                        yaxis: {
                            title: pcaData?.yAxisTitle,
                        },
                        hovermode: "closest",
                        hoverlabel: { bgcolor: "#FFF" },
                        autosize: true, // Enable automatic resizing
                        transition: {
                            duration: 500,
                            easing: 'cubic-in-out'
                        },
                    }}
                    config={{
                        responsive: true,
                    }}

                />
            </div>
        </Paper >
    );


    const barPlot = (
        <Paper elevation={2} style={{ height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ display: "grid", gap: "1em", height: "95%", }}>
                <Plot
                    data={[
                        {
                            x: PropertiesToPropertyNames(properties),
                            y: getValuesOfProperties(normalizedEducations.find(education => education.title == educationGroups[0]?.title) ?? {} as Education).map(value => Math.round(value)),
                            name: educationGroups[0]?.title,
                            mode: "markers",
                            type: "bar",
                            marker: { size: 10, sizemode: "area", colorscale: "Viridis" },
                            hovertemplate:
                                "Værdi: %{y}%<br>" +
                                "<extra></extra>"
                        },
                        {
                            x: PropertiesToPropertyNames(properties),
                            y: getValuesOfProperties(normalizedEducations.find(education => education.title == educationGroups[1]?.title) ?? {} as Education).map(value => Math.round(value)),
                            name: educationGroups[1]?.title,
                            mode: "markers",
                            type: "bar",
                            marker: { size: 10, sizemode: "area", colorscale: "Viridis" },
                            hovertemplate:
                                "Værdi: %{y}%<br>" +
                                "<extra></extra>"
                        },
                        {
                            x: PropertiesToPropertyNames(properties),
                            y: getValuesOfProperties(normalizedEducations.find(education => education.title == educationGroups[2]?.title) ?? {} as Education).map(value => Math.round(value)),
                            name: educationGroups[2]?.title,
                            mode: "markers",
                            type: "bar",
                            marker: { size: 10, sizemode: "area", colorscale: "Viridis" },
                            hovertemplate:
                                "Værdi: %{y}%<br>" +
                                "<extra></extra>"
                        }
                    ]}
                    layout={{
                        title: "Bargraf",
                        xaxis: {
                            title: "Egenskaber"
                        },
                        yaxis: {
                            title: "Værdi normaliseret",
                            range: [0, 100] // Set the range for y-axis
                        },
                        hovermode: "closest",
                        hoverlabel: { bgcolor: "#FFF" },
                        autosize: true, // Enable automatic resizing
                        transition: {
                            duration: 500,
                            easing: 'cubic-in-out'
                        },
                    }}
                    config={{
                        responsive: true,
                    }}

                />
            </div>
        </Paper >
    );

    function getValueByPath(obj: any, path: string): any {
        const keys = path.split('.'); // Split the path string by dot
        let value = obj;

        // Iterate through each part of the path and access nested properties
        for (const key of keys) {
            if (value && typeof value === 'object') {
                value = value[key]; // Access nested property
            } else {
                // If any intermediate property is not an object or undefined, return undefined
                return undefined;
            }
        }

        return value; // Return the final value
    }

    function getValuesOfProperties(edu: Education): number[] {
        let propertyValues: number[] = [];
        properties.forEach((property) => {
            let value = getValueByPath(edu, property);
            if (typeof value === 'number') {
                propertyValues.push(value * 100); // Times 100 to make it look better
            }

        });
        return propertyValues;
    }

    const radarPlot = (
        <Paper elevation={2} style={{ height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ display: "grid", gap: "1em", height: "95%", }}>
                <Plot
                    data={[
                        {
                            r: getValuesOfProperties(normalizedEducations.find(education => education.title == educationGroups[0]?.title) ?? {} as Education), // Set to the education selection of first education
                            theta: PropertiesToPropertyNames(properties),
                            text: PropertiesToPropertyNames(properties),
                            name: educationGroups[0]?.title,
                            mode: "markers",
                            type: "scatterpolar",
                            fill: 'toself',
                            marker: { size: 10, sizemode: "area", colorscale: "Viridis" },
                            hovertemplate:
                                "<b>%{text}</b><br>" +
                                "Værdi: %{r}<br>" +
                                "<extra></extra>"
                        },
                        {
                            r: getValuesOfProperties(normalizedEducations.find(education => education.title == educationGroups[1]?.title) ?? {} as Education),// Set to the education selection of second education
                            theta: PropertiesToPropertyNames(properties),
                            text: PropertiesToPropertyNames(properties),
                            name: educationGroups[1]?.title,
                            mode: "markers",
                            type: "scatterpolar",
                            fill: 'toself',
                            marker: { size: 10, sizemode: "area", colorscale: "Viridis" },
                            hovertemplate:
                                "<b>%{text}</b><br>" +
                                "Værdi: %{r}<br>" +
                                "<extra></extra>"
                        },
                        {
                            r: getValuesOfProperties(normalizedEducations.find(education => education.title == educationGroups[2]?.title) ?? {} as Education),// Set to the education selection of third education
                            theta: PropertiesToPropertyNames(properties),
                            text: PropertiesToPropertyNames(properties),
                            name: educationGroups[2]?.title,
                            mode: "markers",
                            type: "scatterpolar",
                            fill: 'toself',
                            marker: { size: 10, sizemode: "area", colorscale: "Viridis" },
                            hovertemplate:
                                "<b>%{text}</b><br>" +
                                "Værdi: %{r}<br>" +
                                "<extra></extra>"
                        }
                    ]}
                    layout={{
                        title: "Radar",
                        polar: {
                            radialaxis: {
                                visible: true,
                                range: [0, 100]
                            }
                        },
                        hovermode: "closest",
                        hoverlabel: { bgcolor: "#FFF" },
                        autosize: true, // Enable automatic resizing
                        transition: {
                            duration: 500,
                            easing: 'cubic-in-out'
                        },
                    }}
                    config={{
                        responsive: true,
                    }}

                />
            </div>
        </Paper >
    );

    if (chartType == ChartType.scatter) {
        return scatterPlot;
    }
    else if (chartType == ChartType.bar) {
        return barPlot;
    }
    else {
        return radarPlot;
    }
}


export default Visualisation;
