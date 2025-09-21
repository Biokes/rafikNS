import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { UserProvider } from "@/contexts/userProvider.tsx";
import ProtocolProvider from './contexts/protocolProvider';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProtocolProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ProtocolProvider>
    <Toaster />
  </StrictMode>,
)
