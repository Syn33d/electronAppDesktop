import { ReactNode, createContext, useMemo, useContext } from "react";
import React from "react";

export type AppSocket = {
    onMessage(channelId: string, callback: (message: unknown) => void): () => void;
    send(channelId: string, message: unknown): void;
    emit(channelId: string, event: string, ...args: any[]): void;
};

//Define typing of cod exposed by Electron on window object
declare global {
    interface Window {
        MessageAPI:{
            addMessageListener: (channelId: string, callback: (message: unknown) => void) => () => void;
            send: (channelId: string, message: unknown) => void;
        };
    }
}

const context = createContext<AppSocket | null>(null);

//Composant qui fournira le contexte aux composants enfants
export function SocketProvider({ children }: { children: ReactNode }) {

    //Création d'un objet socket pour envoyer et recevoir des messages
    const appSocket = useMemo<AppSocket>(() => ({

        //Fonction pour écouter les messages d'un canal spécifique
        onMessage(channelId: string, callback) {
            return window.MessageAPI.addMessageListener(channelId, callback);
        },

        //Fonction pour envoyer un message à un canal spécifique
        send(channelId:string, message) {
            window.MessageAPI.send(channelId, message);
        },

        //Fonction pour émettre un événement à un canal spécifique
        emit(channelId:string, event, ...args) {
            window.MessageAPI.send(channelId, { event, args });
        },
    }), []);

    //Fournis le contexte aux composants enfants
    return <context.Provider value={appSocket}>{children}</context.Provider>;
}

//Hook pour accéder à l'objet socket
export function useSocket() {
    const socket = useContext(context);

    //Si le hook est utilisé en dehors du contexte SocketProvider
    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return socket;
}