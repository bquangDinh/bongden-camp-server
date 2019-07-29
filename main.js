const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');
const {path} = require('path');

let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1052,
    height: 650,
    frame: false,
    resizable:false,
    webPreferences: {
            nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/View/HTML/mainpage.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
