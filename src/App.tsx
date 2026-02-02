import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <div>

      <p>
        es dentro del div, si pones "p" y das enter, se pondrá solo.
      </p>
<p>intentalo tú</p>
<p>hoy hay sexo. Ahora haz ctrl + s
</p>  

      <h1>
        La programacion es puro poner codigitos? :v
      </h1>
    </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <button>
  <a href="/tutorialEPICO/Setso.tsx"></a>
</button>
    </>
  )
}

export default App
