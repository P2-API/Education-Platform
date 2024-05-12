import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import { useMediaQuery } from "@mui/material";
import HeroIntroduction from "@frontend/components/HeroIntroduction"


const HeroSection: React.FC = () => {

  const centerHero = useMediaQuery("(max-width: 925px)");


  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>

      <HeroIntroduction />
      <div style={{ width: centerHero ? "100%" : "40%", minWidth: "400px" }}>
        <Lottie
          animationData={animationData}
          style={{ minWidth: "400px", height: "500px", minHeight: "400px" }}
        />
      </div>

    </div>
  )
}

export default HeroSection;