import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useMediaQuery } from "@mui/material";


type HeroSectionProps = {
  tableRef: React.RefObject<HTMLDivElement>;
};

const HeroSection: React.FC<HeroSectionProps> = ({ tableRef }) => {

  const useMargin = useMediaQuery("(min-width: 1179px)");
  const centerHero = useMediaQuery("(max-width: 925px)");



  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
      <div
        style={{
          display: "flex",
          width: centerHero ? "80%" : "40%",
          justifyContent: "center",
          gap: "5em",
          height: "94vh",
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
                marginRight: "0.5em",
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
            <p></p>
            <div style={{ display: "flex", marginTop: "2em" }}>
              <CheckCircleIcon sx={{ marginRight: 1 }} color="primary" />{" "}
              <div>
                <b>Rangeringsalgoritme </b> - Ved hjælp af linear programmering
                modelleres og rangeres uddannelserne
              </div>
            </div>

          </div>
          <div style={{ display: "flex", marginTop: "1em" }}>
            <CheckCircleIcon sx={{ marginRight: 1 }} color="primary" />{" "}
            <div>
              <b> Visualisering</b> – Principal Component Analysis (PCA)
              anvendes til at visualisere data
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "1em",
            }}
          >
            <CheckCircleIcon sx={{ marginRight: 1 }} color="primary" />{" "}
            <div style={{ marginBottom: centerHero ? "0em" : "1em" }}>
              <b> Personlig anbefaling</b> – Få en personlig forklaring på
              rangeringen af uddannelserne baseret på dine præferencer baseret
              på AI-teknologi
            </div>
          </div>
          <p></p>
          <button
            className="primary-button"
            style={{ width: "12em" }}
            onClick={() => {
              tableRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Gå til uddannelser
          </button>
        </div>
      </div>

      <div style={{ width: "40%", minWidth: "400px" }}>
        <Lottie
          animationData={animationData}
          style={{ minWidth: "400px", height: "500px", minHeight: "400px" }}
        />
      </div>
    </div>
  )
}

export default HeroSection;