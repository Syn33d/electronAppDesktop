import { app, BrowserWindow, ipcMain, nativeImage, Tray, Menu } from 'electron';
import { chmod } from 'original-fs';
import path from 'path';
import { Socket, io } from "socket.io-client";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Create websocket
  const socket = io("ws://localhost:3000");

  socket.on("connect", () => {
    console.log("Connected to server");

    socket.on('join', (channelId) => {
      console.log('user joined channel:', channelId);
      //socket.join(channelId);
    });

    const channels = ["channel1", "channel2", "channel3"];
    
    channels.forEach(channel => {
      socket.on(channel, (message) => {
        console.log("Received message:", message, channel);
  
        //Send a message to ipcRenderer
        mainWindow.webContents.send(channel, message);

        console.log("Sending message to allChannel", {channel, message});
        mainWindow.webContents.send('allChannel', {channel, message});
      });
    });

    

    socket.on("message", (message) => {
      console.log("Received message:", message);

      //Send a message to ipcRenderer
      mainWindow.webContents.send("socket-message", message);
    });
  });

  ipcMain.on("socket-message", (_, {message, channelId}) => {
    socket.emit(channelId, message);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });ww

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

//Get the icon at the close window
let tray;

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('path/to/asset.png');
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);-

tray.setContextMenu(contextMenu)

tray.setToolTip('Ceci est mon application');

tray.setTitle('Ceci est mon titre');
});
