// import {
//   Bell,
//   ChevronDown,
//   LogOut,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
// import { Button } from "./button";
// import { ScrollArea } from "./scroll-area";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "./popover";
// import { cn } from "@/lib/utils";

// // Dummy notification data for testing UI
// const notifications = [
//   {
//     id: 1,
//     title: "New Message",
//     message: "Alice sent you a message",
//     time: "2 minutes ago",
//     read: false,
//   },
//   {
//     id: 2,
//     title: "Name Registration",
//     message: "Your name has been successfully registered",
//     time: "1 hour ago",
//     read: true,
//   },
//   {
//     id: 3,
//     title: "System Update",
//     message: "New features available in the chat system",
//     time: "2 hours ago",
//     read: true,
//   },
// ];

// interface UserNavProps {
//   user: {
//     imageURL?: string;
//     username?: string;
//   };
//   onDisconnect: () => void;
// }

// export function UserNav({ user, onDisconnect }: UserNavProps) {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="ghost" className="relative h-10 w-full gap-2">
//           <Avatar className="h-8 w-8">
//             <AvatarImage src={user.imageURL} alt={user.username} />
//             <AvatarFallback>{user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
//           </Avatar>
//           <span className="hidden md:inline-block">{user.username}</span>
//           <ChevronDown className="h-4 w-4 shrink-0" />
//           <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
//             3
//           </div>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-0" align="end">
//         <div className="p-4 border-b">
//           <div className="flex items-center gap-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={user.imageURL} alt={user.username} />
//               <AvatarFallback>{user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="text-sm font-medium">{user.username}</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-2">
//           <p className="px-2 py-1.5 text-sm font-semibold">Notifications</p>
//           <ScrollArea className="h-[300px] px-2">
//             <div className="space-y-2">
//               {notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className={cn(
//                     "flex gap-3 rounded-lg p-2 transition-colors",
//                     notification.read ? "opacity-60" : "bg-muted"
//                   )}
//                 >
//                   <Bell className="h-5 w-5 mt-1" />
//                   <div className="flex-1 space-y-1">
//                     <p className="text-sm font-medium leading-none">
//                       {notification.title}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       {notification.message}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {notification.time}
//                     </p>
//                   </div>
//                   {!notification.read && (
//                     <div className="h-2 w-2 rounded-full bg-primary mt-2" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>
//         </div>
//         <div className="p-2 border-t">
//           <Button
//             variant="ghost"
//             className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
//             onClick={onDisconnect}
//           >
//             <LogOut className="h-4 w-4" />
//             Disconnect Wallet
//           </Button>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }
