import Homepage from "@frontend/pages/Homepage";
import Navbar from "@frontend/components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { createContext, useState } from "react";

export type overlay = {
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
}

const OverlayContext = createContext<overlay>({
  showOverlay: true,
  setShowOverlay: () => { },
}
);
export { OverlayContext };

function App() {

  const [showOverlay, setShowOverlay] = useState(true);

  const overlay: overlay = {
    showOverlay,
    setShowOverlay,
  };

  return (

    <OverlayContext.Provider value={overlay}>
      <div style={{ height: "100vh" }}>
        <Toaster richColors />

        <Navbar />

        <div
          style={{
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
    </OverlayContext.Provider>
  );
}

export default App;
