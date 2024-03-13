import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";

const Homepage = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        minWidth: "900px",
      }}
    >
      <div style={{ margin: "3em", width: "30em" }}>
        <h1>UddannelsesPlatform</h1>

        <p>
          Velkommen til uddannelsesplatformen. Her kan du finde information om
          forskellige uddannelser og metoder. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Id nobis hic laudantium voluptate? Quia
          maxime provident doloremque eaque, voluptas ut error sed libero
          tempore, excepturi esse eligendi aut sunt blanditiis.
        </p>
        <button onClick={() => setCount((count) => count + 1)}>
          Du har trykket her {count} gange
        </button>
      </div>
      <Lottie
        animationData={animationData}
        style={{ width: "30em", minWidth: "360px" }}
      />
    </div>
  );
};

export default Homepage;
