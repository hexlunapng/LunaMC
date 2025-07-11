const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  launchGame: (username) => ipcRenderer.invoke('launch-game', username),
  onLog: (callback) => ipcRenderer.on('log', (event, msg) => callback(msg)),
});
