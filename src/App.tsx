import './App.css'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {  QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { config } from "@/config"
import Home from "@/components/home"

const queryClient = new QueryClient();
function App() {

  return (
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({ accentColor: '#e66000ff', accentColorForeground: 'white' })}>
          <Home />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
