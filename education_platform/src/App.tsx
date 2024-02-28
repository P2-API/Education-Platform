import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <h2>P2</h2>
      <h3>React Typescript</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Du har trykket her {count} gange
        </button>

      </div>
    </>
  )
}

export default App
