import React, { useContext, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Plot from 'react-plotly.js';

import { ChartType } from "./VisualisationSettingsBox"
import { useServer } from '@backend/server/useServer';
import { QuizInfoContext, rankedDataInfo, filtersContext } from '@frontend/components/Tabs';
import { PCAData } from '@src/types';

interface VisualisationProps {
    chartType: ChartType,
    properties: string[]
    rankedDataInfo: rankedDataInfo
}

type pcaScatterData = {
    xValues: number[],
    yValues: number[]
    textValues: string[]
}

const Visualisation: React.FC<VisualisationProps> = ({ chartType, properties, rankedDataInfo }) => {

    const [educationProperties, setEducationProperties] = useState<string[]>([]);
    console.log("rankedDataInfo: ", rankedDataInfo)
    const quizAnswerState = useContext(QuizInfoContext);
    const filterInfo = useContext(filtersContext);

    const { getEducationsProperties } = useServer();
    useEffect(() => {
        getEducationsProperties().then((data) => {
            setEducationProperties(data);
        })
    }, []);

    console.log("chartType: ", chartType)

    const { getPCAData } = useServer();
    const [pcaData, setPCAData] = useState<pcaScatterData>();

    useEffect(() => {
        getPCAData(quizAnswerState.quizData, filterInfo.filters).then((data) => {
            setPCAData({
                xValues: data?.points.map((point) => point.x),
                yValues: data?.points.map((point) => point.y),
                textValues: data?.points.map((point) => point.education.title)
            })
        })
    }, [quizAnswerState.quizData]);
    const rankedData = rankedDataInfo;
    const rankIndex = rankedData?.rankedData ? rankedData?.rankedData.index : 366;

    const [data, setData] = React.useState<{ x: number[], y: number[], text: string[] }>({
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 3, 4, 5],
        text: ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"]
    });

    const generateRandomData = () => {
        const xValues = [];
        const yValues = [];
        const text = []
        for (let i = 0; i < educationProperties.length; i++) {
            xValues.push(Math.random() * 10);
            yValues.push(Math.random() * 100);
            // generate random text for each point
            text.push(`Point ${i + 1}`);
        }
        setData({ x: xValues, y: yValues, text: text });
    };

    const scatterPlot = (
        <Paper elevation={2} style={{ height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <button onClick={generateRandomData} >Randomize</button>
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
                            title: "Kramsemar",
                        },
                        yaxis: {
                            title: "Hjalfedildur",
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
            <button onClick={generateRandomData} >Randomize</button>
            <div style={{ display: "grid", gap: "1em", height: "95%", }}>
                <Plot
                    data={[
                        {
                            x: data.y,
                            y: data.x,
                            text: data.text,
                            mode: "markers",
                            type: "bar",
                            marker: { size: 10, sizemode: "area", colorscale: "Viridis" },
                            hovertemplate:
                                "<b>%{text}</b><br><br>" +
                                "Uddannelsestype: %{y}<br>" +
                                "Løn: %{x}<br>" +
                                "<extra></extra>"
                        }
                    ]}
                    layout={{
                        title: "Bar - Løn og uddannelsestype",
                        xaxis: {
                            title: "Løn (kr.)",
                            range: [0, 100] // Set the range for x-axis
                        },
                        yaxis: {
                            title: "Uddannelsestype",
                            range: [0, 10] // Set the range for y-axis
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

    const radarPlot = (
        <Paper elevation={2} style={{ height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <button onClick={generateRandomData} >Randomize</button>
            <div style={{ display: "grid", gap: "1em", height: "95%", }}>
                <Plot
                    data={[
                        {
                            r: [90, 45, 69, 80, 30],// Set to the education selection of first education
                            theta: properties,
                            text: properties,
                            mode: "markers",
                            type: "scatterpolar",
                            fill: 'toself',
                            marker: { size: 10, sizemode: "area", colorscale: "Viridis" },
                            hovertemplate:
                                "<b>%{text}</b><br>" +
                                "Value: %{r}<br>" +
                                "<extra></extra>"
                        }
                    ]}
                    layout={{
                        title: "Radar - Løn og uddannelsestype",
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

    useEffect(() => {
        generateRandomData();
    }, []);


    return (
        ((chartType == ChartType.scatter) && scatterPlot)
        ||
        ((chartType == ChartType.bar) && barPlot)
        ||
        ((chartType == ChartType.radar) && radarPlot)
    )
}


export default Visualisation;
