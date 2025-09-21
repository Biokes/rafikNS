import './App.css'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config, CONTRACT } from "@/config"
import Home from "@/components/home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chats from './components/chats';
import ProtectedRoute from './components/protectedRoute';
import { useEffect } from 'react';
import { useProtocol } from './contexts/useProtocol';
import { toast } from 'sonner';
import { formatUnits } from 'viem';

const queryClient = new QueryClient();

function App() {
  const { fetchProtocolUsers, setProtocolData, data } = useProtocol()

  useEffect(() => {
    const handleDataFetching = () => {
      fetchProtocolUsers()
    }
    
    function handleBtcFeed(price: bigint, time: bigint) {
      setProtocolData({ ...data, btcToUsdtPrice: Number(price) })
      toast.info(`Btc is ${formatUnits(price, 8).toString().substring(0, 10)}  as at ${new Date(Number(time) * 1000).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "medium"
      })}`)
    }

    function handleEthFeed(price: bigint, time: bigint) {
      setProtocolData({ ...data, btcToUsdtPrice: Number(price) })
      toast.info(`ETH is ${formatUnits(price, 8).toString().substring(0, 10)}  as at ${new Date(Number(time) * 1000).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "medium"
      })}`)
    }

    CONTRACT.on("BtcUSDTPrice", (price, time) => {
      handleBtcFeed(price, time)
    })

    CONTRACT.on("EthUSDTPrice", (price, time) => {
      handleEthFeed(price, time)
    })

    CONTRACT.on("CreatedName", handleDataFetching)
    CONTRACT.on("", handleBtcFeed)
    
    return () => {
      CONTRACT.off("Messaging", handleDataFetching)
      CONTRACT.off("BtcUSDTPrice",(price, time)=>handleBtcFeed(price,time))
      CONTRACT.off("EthUSDTPrice",(price, time)=>handleEthFeed(price,time))
      CONTRACT.off("CreatedName", handleDataFetching)
    }

  }, [fetchProtocolUsers, setProtocolData])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({ accentColor: '#e66000ff', accentColorForeground: 'white' })}>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
