import { createContext, useContext, useEffect, useState } from "react";
import {io} from "socket.io-client"  // Note: Corrected import
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketConnection = io("http://localhost:4000");
        setSocket(socketConnection);

        // Cleanup on component unmount
        return () => {
            socketConnection.disconnect();
        };
    }, []);

    useEffect(() => {
        if (currentUser && socket) {
            socket.emit("newUser", currentUser.id);
        }
    }, [currentUser, socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};