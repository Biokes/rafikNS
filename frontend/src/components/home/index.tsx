import { ConnectButton } from "@rainbow-me/rainbowkit";
import HeroSection from "./Hero";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useProtocol } from "@/contexts/useProtocol";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/useUser";

export default function Home() {
    const { address } = useAccount()
    const { data } = useProtocol()
    const navigate = useNavigate()
    const { setUserDetails } = useUser()
    useEffect(() => {
        if (!address || !data?.users) return;
        const matchedUser = data!.users.find(
            (user) => user.userAddress.toLowerCase() === address.toLowerCase()
        );
        if (matchedUser) {
            setUserDetails((prev) => {
                if (prev?.id === matchedUser.userAddress) return prev;
                return { ...matchedUser, id: matchedUser.userAddress };
            });
            navigate("/chats", { replace: true });
        }
    }, [address, data, navigate, setUserDetails]);

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