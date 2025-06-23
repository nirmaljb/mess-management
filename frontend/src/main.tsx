import React, { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router";
import Header from './components/Header.tsx'
import MainLayout from './MainLayout.tsx'
import Auth from './pages/Auth.tsx'

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
            <Route path="auth" element={<Auth />} />
          </Route>
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)