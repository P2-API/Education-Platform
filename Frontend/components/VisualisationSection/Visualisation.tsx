
import React, { useEffect, useRef } from 'react';
import { Paper } from '@mui/material';
import Plot from 'react-plotly.js';

import { chartType } from '@frontend/pages/VisualisationSection';

interface VisualisationProps {
    chartType: chartType
}

const Visualisation: React.FC<VisualisationProps> = () => {





    return (
        <Paper elevation={2} style={{ height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ display: "grid", gap: "1em", height: "100%", }}>
                <Plot
                    data={[
                        {
                            x: [1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18],
                            y: [32, 37, 40.5, 43, 49, 54, 59, 63.5, 69.5, 73, 74],
                            mode: "markers",
                            type: "scatter",
                        },
                    ]}
                    layout={{
                        title: "PCA Analyse - Løn og uddannelsestype",
                        xaxis: {
                            title: "Uddannelsestype",
                        },
                        yaxis: {
                            title: "Løn (kr.)",
                        },
                    }}
                />
            </div>
        </Paper>
    );
};

export default Visualisation;



