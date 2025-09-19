import Chat from "./Chat";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/userProvider";
import { Bell, LogOut } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatPage() {
    const { openConnectModal } = useConnectModal();
    const { user } = useUser();

    const notifications = [
        {
            id: 1,
            message: "New message from Alice",
            time: "2 minutes ago",
            read: false,
        },
        {
            id: 2,
            message: "Bob registered a new name",
            time: "1 hour ago",
            read: true,
        }
    ];

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
                        <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-[10px] font-medium text-primary-foreground">
                                {notifications.filter(n => !n.read).length}
                            </span>
                        </div>
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
                        <div>
                            <h4 className="font-medium px-2 mb-2">Notifications</h4>
                            <ScrollArea className="h-[200px]">
                                <div className="space-y-2 px-2">
                                    {notifications.map((notification) => (
                                        <div key={notification.id} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                                            <Bell className="h-4 w-4 mt-1" />
                                            <div className="flex-1">
                                                <p className="text-sm">{notification.message}</p>
                                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                                            </div>
                                            {!notification.read && (
                                                <div className="h-2 w-2 rounded-full bg-primary mt-1" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
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