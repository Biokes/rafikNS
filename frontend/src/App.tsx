import './App.css'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "@/config"
import Home from "@/components/home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chats from './components/chats';
import ProtectedRoute from './components/protectedRoute';

const queryClient = new QueryClient();
function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({ accentColor: '#e66000ff', accentColorForeground: 'white' })}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chats" element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
