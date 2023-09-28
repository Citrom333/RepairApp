import gears from '/images/gears-5908.gif'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="mainPage">
        <img src={gears} className="logo" alt="Vite logo" />
        <h1>Assembly workshop</h1>
        <a href="/vehicles">
          <button >
            Vehicles
          </button>
        </a>
      </div>
    </>
  )
}

export default App
