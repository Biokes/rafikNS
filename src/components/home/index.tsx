import { ConnectButton } from "@rainbow-me/rainbowkit";
import HeroSection from "./Hero";

export default function Home() {
    return (
        <div>
            <nav className="bg-gray-100 dark:bg-gray-900 shadow-sm flex items-center justify-between p-1 w-full bg-gray-100 p-3">
                <p className="text-[1.4rem] bold rounded-lg name">RafikNS</p>
                <ConnectButton />
            </nav>
            <HeroSection />
        </div>
    )
}