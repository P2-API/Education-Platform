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
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quod
          pariatur neque ea est! Ea, nihil. Laborum, ipsa sapiente, eum corporis
          ratione harum incidunt ullam temporibus, ipsum illo et ut.m, ipsa
          sapiente, eum corporis ratione harum incidunt ullam temporibus, ipsum
          illo et ut.m, ipsa sapiente, eum corporis ratione harum incidunt ullam
          temporibus, ipsum illo et ut.
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
