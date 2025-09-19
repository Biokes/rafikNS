import {type JSX} from "react";
import {Navigate} from "react-router-dom";
import {useAccount} from "wagmi";
import {useUser} from "@/contexts/userProvider.tsx";

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const {isConnected} = useAccount();
    const {user} = useUser()
    if (!isConnected || !user) {
        return <Navigate to="/" replace/>;
    }
    return children;
}