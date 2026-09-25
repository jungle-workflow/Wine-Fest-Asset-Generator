import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import BoothSignNavigator from "./components/Booth Signs/BoothSignNavigator"
import ClipboardSignNavigator from './components/Booth Signs/ClipboardSignNavigator'
import WineGuide from './components/Wine Guide/WineGuideNavigator'

function App() {
  const navigate = useNavigate()

  return <>


    <Routes>
      <Route path="/" element={<>
        <select value={"/"} onChange={(event) => navigate(event.target.value)}>
          <option value="/">Select a route</option>
          <option value="/banner">Booth Sign - Banner</option>
          <option value="/clipboard">Booth Sign - Clipboard</option>
          <option value="/guide">Wine Guide</option>
        </select>
      </>} />
      <Route path="/banner" element={<BoothSignNavigator />} />
      <Route path="/clipboard" element={<ClipboardSignNavigator />} />
      <Route path="/guide" element={<WineGuide />} />
    </Routes>
  </>
}

export default App