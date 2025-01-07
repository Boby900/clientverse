import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import App from './App.tsx'
import { Toaster } from "@/components/ui/toaster"
import { BadgeProvider } from './hooks/badgeContext.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <BadgeProvider>

    <App />
    </BadgeProvider>

    <Toaster />
    </BrowserRouter>

  </StrictMode>,
)
