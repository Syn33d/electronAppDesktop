// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("MessageAPI", {
    //Écouteur d'événement pour les messages d'un canal spécifique
    addMessageListener: (channelId: string, callback: (message: unknown) => void) => {

        const wrappedCallback = (_: IpcRendererEvent, message: unknown) => callback(message);

        //Écoute l'événement lié à channelID
        ipcRenderer.on(channelId, wrappedCallback);

        //Retourne une fonction pour supprimer l'écouteur au moment de l'appel
        return () => ipcRenderer.off(channelId, wrappedCallback);
    },

    //Envoie un message à la fenêtre principale
    send(channelId: string, message: unknown) {
        ipcRenderer.send('socket-message',{channelId, message});
    },
});