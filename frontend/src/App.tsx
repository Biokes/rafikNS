import './App.css'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "@/config"
import Home from "@/components/home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chats from './components/chats';

const queryClient = new QueryClient();
function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({ accentColor: '#e66000ff', accentColorForeground: 'white' })}>
          <Router>
            {/* <div className="flex flex-col overflow-hidden h-screen">
              <nav className="bg-gray-100 dark:bg-gray-900 shadow-sm flex items-center justify-between p-1 w-full bg-gray-100 p-3">
                <p className="text-[1.4rem] bold rounded-lg name">RafikNS</p>
                <ConnectButton />
              </nav> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chats" element={<Chats />} />
              </Routes>
            {/* </div> */}
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
