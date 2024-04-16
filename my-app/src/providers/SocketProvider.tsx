import { createContext, useContext, useEffect, useMemo, ReactNode } from "react";
import { Socket, io } from "socket.io-client";
import React from "react";

export type AppSocket = {
    onMessage(callback: (message: unknown) => void): () => void;
    send(message: string): void;
};

const context = createContext<AppSocket | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
    const websocket = useMemo(() => io("http://localhost:3000"), []);
    
    const appSocket = useMemo<AppSocket>(() => ({
        onMessage(callback){
            websocket.on("message", callback);
            return () => {
                websocket.off("message", callback);
            };
        },
        send(message) {
            websocket.send(message);
        }
    }), []);

    return <context.Provider value={appSocket}>{children}</context.Provider>;
}

export function useSocket() {
    const socket = useContext(context);

    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return socket;
}