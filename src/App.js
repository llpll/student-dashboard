import './App.css'
import Dashboard from './components/layout/Dashboard'
import { useDataLoader } from './data_loader'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path=':name' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

function Home() {
  const app = useSelector((state) => state.app)
  useDataLoader(app.dataLoaded)

  const projects = useSelector((state) => state.projects)
  const students = useSelector((state) => state.students)

  return (
    <div className='App'>
      <Dashboard
        dataIsLoaded={app.dataLoaded}
        projects={projects}
        students={students}
        app={app}
      />
    </div>
  )
}

export default App
