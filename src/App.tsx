import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import BannerNavigator from "./components/Booth Signs/BannerNavigator"
import ClipboardNavigator from './components/Booth Signs/ClipboardNavigator'
import WineGuide from './components/Wine Guide/WineGuideNavigator'
import OnlineWineGuide from './components/Online Wine Guide/OnlineWineGuideNavigator'

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
          <option value="/online-guide">Online Wine Guide</option>
        </select>
      </>} />
      <Route path="/banner" element={<BannerNavigator />} />
      <Route path="/clipboard" element={<ClipboardNavigator />} />
      <Route path="/guide" element={<WineGuide />} />
      <Route path="/online-guide" element={<OnlineWineGuide />} />
    </Routes>
  </>
}

export default App