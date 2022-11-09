import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ApplicationLayout from './layouts/ApplicationLayout'
import AuthLayout from './layouts/AuthLayout'
import AddProductPage from './pages/AddProductPage'
import OrderPage from './pages/OrderPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'

export const Apps = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route path="/app" element={<ApplicationLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="orders" element={<OrderPage />} />
        </Route>
        <Route path="/add-product/:barcode" element={<AddProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}
