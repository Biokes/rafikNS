import { ConnectButton } from "@rainbow-me/rainbowkit";
import HeroSection from "./Hero";
import { publicClient, CONTRACT_ABI, CONTRACT_ADDRESS } from "@/config";
import { useCallback, useEffect } from "react";
import type { Hex } from "viem";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    const { address , isConnected} = useAccount();

    const isRegistered = useCallback(async () => {
        try {
            const isAvailableName = await publicClient?.readContract({
                abi: CONTRACT_ABI,
                address: CONTRACT_ADDRESS as Hex,
                functionName: "isAvailableName",
                args: [address]
            })
            if (!isAvailableName) {
                navigate("/chats")
            }
        } catch (error) {
            console.error("error during search: ", error)
        }
    }, [address])

    useEffect(() => {
        if (isConnected) {
            isRegistered()
        }
    }, [isConnected, isRegistered])


    return (
        <div className="flex flex-col overflow-hidden h-screen">
            <nav className="bg-gray-100 dark:bg-gray-900 shadow-sm flex items-center justify-between p-1 w-full bg-gray-100 p-3">
                <p className="text-[1.4rem] bold rounded-lg name">RafikNS</p>
                <ConnectButton />
            </nav>
            <main className="flex-1 relative">
                <HeroSection />
            </main>
        </div>
    )
}