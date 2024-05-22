import React from 'react';

type IntroductionOverlayProps = {
    closeOverlay: () => void;
    tableRef: React.RefObject<HTMLDivElement>;
};


const IntroductionOverlay: React.FC<IntroductionOverlayProps> = ({ closeOverlay, tableRef }) => {



    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#f8fbff" }}>
            <div ref={tableRef} id="table" style={{ backgroundColor: "white", paddingTop: "3.5em" }} />

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <h1 style={{ fontSize: "2em", marginBottom: "1em" }}>Dette er den interaktive sektion af platformen</h1>
                <p style={{ fontSize: "1.2em", maxWidth: "80%", textAlign: "center" }}>Der er 2 sider du kan udforske. </p>
                <p style={{ fontSize: "1.2em", maxWidth: "80%", textAlign: "center" }}>Den første side er en datatabel med alle uddannelser, samt en tilhørende filtreringsbox. Her kan du angive dine kriterier og filtre for datarangeringen, samt besvare en quiz for at angive prioriteter. I alt bliver uddannelserne rangeret på baggrund af mindst 24 faktorer.</p>
                <p style={{ fontSize: "1.2em", maxWidth: "80%", textAlign: "center" }}>Den anden side er en visualiseringsside hvor 3 forskellige visualiseringer kan vælges. Her ligger PCA analysen som viser hvor relaterede uddannelserne er på hinanden, på baggrund af alle faktorer.<br />Derudover kan en bar graf og en radar graf vælges, til at sammenligne forskellige uddannelser på selvvalgte faktorer</p>
                <button className="primary-button" style={{ marginRight: "0.5em", borderRadius: 5 }} onClick={closeOverlay}>Start!</button>
            </div>
        </div >
    );
};

export default IntroductionOverlay;


