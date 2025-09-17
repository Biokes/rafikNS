import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";
// import { gql, request } from 'graphql-request'

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isConnected } = useAccount();

    // const document = gql`{
    //     createdNames(first: 100) {
    //         username
    //         userAddress
    //         }
    // }`
    
    // async function checkUser() {
    //     try {
    //         const response = await request('https://api.studio.thegraph.com/query/120726/rafik-ns/0.0.1', document)
    //         console.log("grapgql response: ", response)
    //     } catch (error) {
    //         console.log("graphql error: ", error)
    //     }
    // }

    // useEffect(() => {
    //     if (isConnected && address) {
    //         checkUser();
    //     }
    // }, [isConnected, address]);


    if (!isConnected) {
        return <Navigate to="/" replace />;
    }
    return children;
}