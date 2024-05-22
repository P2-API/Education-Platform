import React, { useContext } from 'react';
import BasicTabs from '../components/Tabs.tsx';
import IntroductionOverlay from '../components/IntroductionOverlay.tsx';
import { OverlayContext } from '@src/App.tsx';


type InteractiveSectionProps = {
    tableRef: React.RefObject<HTMLDivElement>;
};


const InteractiveSection: React.FC<InteractiveSectionProps> = ({ tableRef }) => {

    const overlay = useContext(OverlayContext);

    if (overlay.showOverlay) {
        return (
            <IntroductionOverlay closeOverlay={() => overlay.setShowOverlay(false)} tableRef={tableRef} />
        );
    }

    return (
        <div style={{ height: "100vh", width: "100%", backgroundColor: "#f8fbff" }}>
            <div ref={tableRef} id="table" style={{ backgroundColor: "white", paddingTop: "3.5em" }} />
            <BasicTabs />
        </div >
    );
};

export default InteractiveSection;


