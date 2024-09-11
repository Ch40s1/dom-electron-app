const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev'); // Detect if the app is running in development mode
const db = require('./database'); // Import database functions

if (isDev) {
  require('electron-reloader')(module);
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('views/index.html');
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

}

app.whenReady().then(() => {
  createWindow();
  db.initDatabase();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Handle IPC calls from renderer
ipcMain.on('add-person', (event, name, age, email) => {
  db.addPerson(name, age, email);
});

ipcMain.handle('get-people', async () => {
  return new Promise((resolve) => {
    db.getPeople((rows) => {
      resolve(rows);
    });
  });
});
