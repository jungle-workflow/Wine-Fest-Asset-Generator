import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import BoothSignNavigator from "./components/Booth Signs/BoothSignNavigator"
import ClipboardSignNavigator from './components/Booth Signs/ClipboardSignNavigator'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedPath = location.pathname === '/clipboard' ? '/clipboard' : '/banner'

  return <>
    <select value={selectedPath} onChange={(event) => navigate(event.target.value)}>
      <option value="/banner">Booth Sign - Banner</option>
      <option value="/clipboard">Booth Sign - Clipboard</option>
    </select>

    <Routes>
      <Route path="/" element={<Navigate to="/banner" replace />} />
      <Route path="/banner" element={<BoothSignNavigator />} />
      <Route path="/clipboard" element={<ClipboardSignNavigator />} />
      <Route path="*" element={<Navigate to="/banner" replace />} />
    </Routes>
  </>
}

export default App