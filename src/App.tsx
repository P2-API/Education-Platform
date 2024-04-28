import Homepage from "@frontend/pages/Homepage";
import Navbar from "@frontend/components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />

      <div
        style={{
          height: "92%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<h1>Om siden</h1>} />
          <Route path="/methods" element={<h1>Kontakt</h1>} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
