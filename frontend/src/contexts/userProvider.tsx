import { type ReactNode, useState } from "react";
import type { BaseUser } from "@/types";
import { UserContext } from "./useUser";

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserDetails] = useState<BaseUser | null>(null);

    return (
        <UserContext.Provider value={{ user, setUserDetails }}>
            {children}
        </UserContext.Provider>
    )
}
