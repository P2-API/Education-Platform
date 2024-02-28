import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <h1>P2</h1>
      <h2>React Typescript</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Du har trykket her {count} gange
        </button>

      </div>
    </>
  )
}

export default App
