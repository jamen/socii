import { join } from 'path';
import neta from './lib';
import minimist from 'minimist';
import { app, BrowserWindow, ipcMain } from 'electron';

const args = neta.args = minimist(process.argv.slice(2));
let main = neta.main = {};

app.on('ready', () => {
  main = neta.main = new BrowserWindow(neta.mainWindow());
  main.loadURL('file://' + join(__dirname, 'view', 'app.html'));

  // Developer
  if (args.dev) {
    main.openDevTools({ detach: true });
  }
});

app.on('window-all-closed', function quit() {
  app.quit();
});

ipcMain.on('neta-theme-injected', () => {
  main.show();
});
