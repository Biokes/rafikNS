import Chat from "./Chat";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/contexts/useUser";

export default function ChatPage() {
    const { openConnectModal } = useConnectModal();
    const { user } = useUser();


    function DisConnectButton() {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="cursor-pointer flex items-center gap-2 relative">
                        <div className="w-[30px] h-[30px] rounded-[20px] border-[1px] overflow-hidden">
                            <img src={user?.imageURL} alt="userProfilePix" className="object-cover w-full h-full object-center" />
                        </div>
                        <p className="hidden md:block">
                            {user ? `${user?.username}.rafik` : 'Anonymous'}
                        </p>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-2 border-b">
                            <div className="w-10 h-10 rounded-full border overflow-hidden">
                                <img src={user?.imageURL} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="font-medium">{user ? `${user.username}.rafik` : 'Anonymous'}</p>
                            </div>
                        </div>
                        <Button className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                            variant="ghost" onClick={() => openConnectModal?.()}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Disconnect
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <div className="flex flex-col max-w-[1350px] h-screen max-h-screen mx-auto">
            <nav className="bg-gray-100 dark:bg-gray-900 shadow-sm flex items-center justify-between p-3 w-full">
                <p className="text-[1.4rem] bold rounded-lg name">RafikNS</p>
                {user ?
                    (
                        <DisConnectButton />
                    )
                    :
                    (
                        <Button className="cursor-pointer" onClick={() =>{openConnectModal?.()}}>
                            Connect Wallet
                        </Button>
                    )
                }
            </nav>
            <Chat />
        </div>
    )
}