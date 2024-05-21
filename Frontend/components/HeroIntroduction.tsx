


import React, { useContext } from 'react';
import { TableSectionReferenceContext } from '../pages/Homepage';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useMediaQuery } from "@mui/material";




const HeroIntroduction: React.FC = () => {

    const tableRef = useContext(TableSectionReferenceContext)!;


    const useMargin = useMediaQuery("(min-width: 1179px)");
    const centerHero = useMediaQuery("(max-width: 925px)");


    return (
        <div
            style={{
                display: "flex",
                width: centerHero ? "80%" : "40%",
                justifyContent: "center",
                gap: "5em",
                height: centerHero ? "auto" : "94vh",
                flexWrap: "wrap",
                alignItems: "center",
                marginTop: useMargin ? "1em" : "3em",
            }}
        >
            <div
                style={{
                    minWidth: "345px",
                    ...(centerHero && {
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        // reduce gap
                    }),
                }}
            >
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                        marginTop: "2em",
                        justifyContent: centerHero ? "center" : "flex-start",
                    }}
                >
                    <h1
                        className="text-color-blue"
                        style={{
                            fontSize: "xxx-large",
                            minWidth: "20px",
                            margin: 0,
                            marginRight: "0.25em",
                            marginTop: 0,
                        }}
                    >
                        Find den
                    </h1>
                    <h1
                        className="text-color-blue"
                        style={{
                            fontSize: "xxx-large",
                            minWidth: "50px",
                            margin: 0,
                            justifyContent: "center",
                            marginTop: 0,
                            marginRight: "0.25em",
                        }}
                    >
                        perfekte
                    </h1>
                    <h1
                        className="text-color-blue"
                        style={{
                            fontSize: "xxx-large",
                            minWidth: "50px",
                            margin: 0,
                        }}
                    >
                        uddannelse!
                    </h1>
                </div>

                <div>

                    <div style={{ width: "100%" }}>
                        <p
                            style={{
                                fontWeight: "normal",
                                marginBottom: centerHero ? -35 : "",
                            }}
                        >
                            Velkommen til uddannelsesplatformen. Her kan du finde den idéelle
                            uddannelse til dig, baseret på data fra offentlige myndigheder og
                            statistikker, samt ved hjælp af rangeringsalgoritmer og
                            visualiseringsværktøjer.
                        </p>
                    </div>



                </div>
                <div style={{ display: "flex", marginTop: "2em", textAlign: "left" }}>
                    <CheckCircleIcon sx={{ marginRight: 1 }} color="primary" />{" "}
                    <div>
                        <b>Rangeringsalgoritme </b> - Ved hjælp af linear programmering
                        modelleres og rangeres uddannelserne
                    </div>
                </div>
                <div style={{ display: "flex", marginTop: "1em", textAlign: "left" }}>
                    <CheckCircleIcon sx={{ marginRight: 1 }} color="primary" />{" "}
                    <div>
                        <b> Visualisering</b> – Principal Component Analysis (PCA)
                        anvendes til at visualisere data
                    </div>
                </div>
                <div
                    style={{ display: "flex", marginTop: "1em", textAlign: "left" }} >
                    <CheckCircleIcon sx={{ marginRight: 1 }} color="primary" />{" "}
                    <div style={{ marginBottom: centerHero ? "0em" : "1em" }}>
                        <b> Personlig anbefaling</b> – Få en personlig forklaring på
                        rangeringen af uddannelserne baseret på dine præferencer baseret
                        på AI-teknologi
                    </div>
                </div>
                <br></br>
                <button
                    className="primary-button"
                    style={{ width: "12em", marginRight: "1em" }}
                    onClick={() => {
                        tableRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    Gå til uddannelser
                </button>
                {/*                 <button className="primary-button" style={{ backgroundColor: "blue" }} onClick={serverGreetsWithToast}>Snak med server</button>
 */}
            </div>
        </div>
    );
};

export default HeroIntroduction;