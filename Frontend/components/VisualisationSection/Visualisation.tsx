import React, { useEffect, useRef } from 'react';
import { Paper } from '@mui/material';
import Plot from 'react-plotly.js';

import { chartType } from '@frontend/pages/VisualisationSection';

interface VisualisationProps {
    chartType: chartType
}

const Visualisation: React.FC<VisualisationProps> = () => {

    const [data, setData] = React.useState<{ x: number[], y: number[], text: string[] }>({
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 3, 4, 5],
        text: ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"]
    });

    const generateRandomData = () => {
        const xValues = [];
        const yValues = [];
        const text = []
        for (let i = 0; i < 100; i++) {
            xValues.push(Math.random() * 10);
            yValues.push(Math.random() * 100);
            // generate random text for each point
            text.push(`Point ${i + 1}`);
        }
        setData({ x: xValues, y: yValues, text: text });
    };

    useEffect(() => {
        generateRandomData();
    }, []);

    return (
        <Paper elevation={2} style={{ height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <button onClick={generateRandomData} >Randomize</button>
            <div style={{ display: "grid", gap: "1em", height: "95%", }}>
                <Plot
                    data={[
                        {
                            x: data.x,
                            y: data.y,
                            text: data.text,
                            mode: "markers",
                            type: "scatter",
                            marker: { size: 10, sizemode: "area", colorscale: "Viridis" },
                            hovertemplate:
                                "<b>%{text}</b><br><br>" +
                                "Løn: %{y}<br>" +
                                "Uddannelsestype: %{x}<br>" +
                                "<extra></extra>"
                        }
                    ]}
                    layout={{
                        title: "PCA Analyse - Løn og uddannelsestype",
                        xaxis: {
                            title: "Uddannelsestype",
                            range: [0, 10] // Set the range for x-axis
                        },
                        yaxis: {
                            title: "Løn (kr.)",
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
};

export default Visualisation;
