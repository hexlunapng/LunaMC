const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Client } = require('minecraft-launcher-core');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle('launch-game', async (event, username) => {
  try {
    const launcher = new Client();

const options = {
  authorization: {
    access_token: "0",
    client_token: "0",
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    name: username || "Player",
  },
  root: path.join(__dirname, '.minecraft'),
  version: {
    number: '1.16.5',
    type: 'release',
  },
  memory: {
    max: "2G",
    min: "1G"
  },
  overrides: {
    server: {
      ip: "lunaa33.aternos.me",
      port: 47038
    }
  }
};


    launcher.launch(options);

    launcher.on('debug', (msg) => win.webContents.send('log', `[DEBUG] ${msg}`));
    launcher.on('data', (msg) => win.webContents.send('log', `[DATA] ${msg}`));
    launcher.on('error', (err) => win.webContents.send('log', `[ERROR] ${err.message || err}`));
  } catch (err) {
    win.webContents.send('log', `[FATAL ERROR] ${err.message || err}`);
  }
});
