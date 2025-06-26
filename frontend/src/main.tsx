import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router";
import MainLayout from './MainLayout.tsx'
import Auth from './pages/Auth.tsx'
import Dashboard from './pages/Dashboard.tsx'
import StudentMainLayout from './StudentMainLayout.tsx'
import Queries from './pages/Queries.tsx'
import Scanner from './pages/admin/Scanner.tsx'
import MyQrcode from './pages/MyQrcode.tsx'
import Payment from './pages/Payment.tsx'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<App />} />
            <Route path="auth/*" element={<Auth />} />
          </Route>
          <Route path="/student/app" element={<StudentMainLayout /> }>
            <Route index element={<Dashboard />}/>
            <Route path="payment" element={<Payment />}/>
            <Route path="queries-complaints" element={<Queries />}/>
            <Route path="qrcode" element={<MyQrcode />}/>
          </Route>
          <Route path="/admin/app">
            <Route path="scanner" element={<Scanner />} />
          </Route>
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)