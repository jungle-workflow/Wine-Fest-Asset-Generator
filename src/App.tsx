import { Route, Routes, useNavigate } from 'react-router-dom'
import BannerNavigator from "./components/Booth Signs/BannerNavigator"
import ClipboardNavigator from './components/Booth Signs/ClipboardNavigator'
import WineGuide from './components/Wine Guide/WineGuideNavigator'
import OnlineWineGuide from './components/Online Wine Guide/OnlineWineGuideNavigator'
import OrderSlipNavigator from './components/Order Slips/OrderSlipNavigator'
import BuyerNavigator from './components/Roundup Buyer/BuyerNavigator'
import { VendorNavigator } from './components/Roundup Vendor/VendorNavigator'
import { DistributorNavigator } from './components/Roundup Distributor/DistNavigator'

function App() {
  const navigate = useNavigate()

  return <>


    <Routes>
      <Route path="/" element={<>
        <select value={"/"} onChange={(event) => navigate(event.target.value)}>
          <option value="/">Select a route</option>
          <option value="/banner">Booth Sign – Banner</option>
          <option value="/clipboard">Booth Sign – Clipboard</option>
          <option value="/guide">Wine Guide – Physical</option>
          <option value="/online-guide">Wine Guide – Online</option>
          <option value="/order-slips">Order Slips</option>
          <option value="/distributor">Roundup – Distributor Spreadsheet</option>
          <option value="/vendor">Roundup – Vendor Dropoff</option>
          <option value="/buyer">Roundup – Buyer Receipts</option>
        </select>
      </>} />
      <Route path="/banner" element={<BannerNavigator />} />
      <Route path="/clipboard" element={<ClipboardNavigator />} />
      <Route path="/guide" element={<WineGuide />} />
      <Route path="/online-guide" element={<OnlineWineGuide />} />
      <Route path="/order-slips" element={<OrderSlipNavigator />} />
      <Route path="/distributor" element={<DistributorNavigator />} />
      <Route path="/vendor" element={<VendorNavigator />} />
      <Route path="/buyer" element={<BuyerNavigator />} />
    </Routes>
  </>
}

export default App