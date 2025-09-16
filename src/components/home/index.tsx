import { ConnectButton } from "@rainbow-me/rainbowkit";
import HeroSection from "./Hero";

export default function Home() {
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