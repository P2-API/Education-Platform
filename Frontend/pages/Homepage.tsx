import { useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useMediaQuery } from "@mui/material";
import MaterialReactDataTable from "../components/DataTable";

const Homepage = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery("(min-width: 800px)");

  const useMargin = useMediaQuery("(min-width: 1179px)");
  const centerHero = useMediaQuery("(max-width: 925px)");

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "5em",
          minHeight: "80vh",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: useMargin ? "1em" : "3em",
        }}
      >
        <div
          style={{
            width: "35%",
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
          {matches ? (
            <h1 className="text-color-blue" style={{ fontSize: "xxx-large" }}>
              UddannelsesPlatform
            </h1>
          ) : (
            <>
              <h1
                className="text-color-blue"
                style={{ fontSize: "xxx-large", marginBottom: 0 }}
              >
                Uddannelses
              </h1>
              <h1
                className="text-color-blue"
                style={{
                  fontSize: "xxx-large",
                  marginTop: -20,
                  marginBottom: 0,
                }}
              >
                Platform
              </h1>
            </>
          )}
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
          <p></p>
          <div style={{ display: "flex", marginTop: "2em" }}>
            <CheckCircleIcon sx={{ marginRight: 1 }} color="primary" />{" "}
            <div>
              <b>Rangeringsalgoritme </b> - Ved hjælp af linear programmering
              modelleres og rangeres uddannelserne
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
        <Lottie
          animationData={animationData}
          style={{ minWidth: "400px", height: "500px", minHeight: "400px" }}
        />
      </div>

      <div style={{ height: "100%", width: "80%" }}>
        <h1 style={{ textAlign: "center" }} className="text-color-blue">
          Uddannelser
        </h1>
        <div ref={tableRef} id="table" />

        <MaterialReactDataTable />
      </div>
    </>
  );
};

export default Homepage;
