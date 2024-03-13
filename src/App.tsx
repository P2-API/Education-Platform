import { useState } from 'react'
import Homepage from '@frontend/pages/Homepage';
import Navbar from '@frontend/components/Navbar';
import {Routes, Route} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)


  return (
    <div style={{margin: "2em"}}>
      <Navbar />
      
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<h1>Om siden</h1>} />
          <Route path="/methods" element={<h1>Kontakt</h1>} />
          {/* Add more routes here */}
        </Routes>
    </div>

  )
}

export default App
