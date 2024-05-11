
import React, { useEffect, useRef } from 'react';
import { Paper } from '@mui/material';
import * as Plotly from 'plotly.js';

import { chartType } from '@frontend/pages/VisualisationSection';

interface VisualisationProps {
    chartType: chartType
}

const Visualisation: React.FC<VisualisationProps> = () => {
    /* 
        const data: Plotly.ScatterData[] = [
            {
                x: [1, 2, 3, 4],
                y: [10, 11, 12, 13],
                mode: 'markers',
                type: 'scatter',
                z: [], // Add missing property
                i: [], // Add missing property
                j: [], // Add missing property
                k: [] // Add missing property
            }
        ];
     *//* 
       const layout: Partial<Plotly.Layout> = {
           title: 'A Fancy Plot',
           showlegend: false
       };
   
       const config: Partial<Plotly.Config> = {
           displayModeBar: false
       };
   
       const plotlyRef = useRef<HTMLDivElement>(null);
   
       useEffect(() => {
           if (plotlyRef.current) {
               Plotly.newPlot(plotlyRef.current, data, layout, config);
           }
       }, [plotlyRef]);
   
    */

    return (
        <Paper elevation={2} style={{ height: "100%", zIndex: 1, width: "100%", overflowY: "scroll" }}>
            <div style={{ height: "3.5em", position: "sticky", top: 0, zIndex: 2, borderBottom: "2px solid black", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white" }}>
                <h3 style={{ textAlign: "left", paddingLeft: "0.5em" }}>Visualisering</h3>
            </div>
            {/*             <div style={{ height: "100%", width: "100%" }} ref={plotlyRef}></div>
 */}        </Paper>
    );
};

export default Visualisation;