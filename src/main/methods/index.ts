import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

export const initMethods = (mainWindow, momentsWindow) => {
  ipcMain.on('window-moved', (_event, screenWidth, screenHeight, newBounds, xBuffer, yBuffer) => {
    if (newBounds.x + newBounds.width < screenWidth - 10 && newBounds.x > 10 && newBounds.y > 10 && newBounds.y + newBounds.height < screenHeight - 10) {
      mainWindow.setPosition(newBounds.x, newBounds.y);
      _event.preventDefault();
    }

    if (newBounds.x + newBounds.width >= screenWidth - 10 && xBuffer < newBounds.x && newBounds.x + newBounds.width < screenWidth) {
      mainWindow.setPosition(screenWidth - newBounds.width, newBounds.y);
      mainWindow.setMovable(false);
      setTimeout(() => {
        mainWindow.setMovable(true);
      },500);
      _event.preventDefault();
    } else if (newBounds.x + newBounds.width >= screenWidth - 10 && xBuffer > newBounds.x && newBounds.x + newBounds.width < screenWidth) {
      mainWindow.setPosition(screenWidth - newBounds.width - 10, newBounds.y);
      _event.preventDefault();
    }

    if (newBounds.y + newBounds.height >= screenHeight - 10 && yBuffer < newBounds.y && newBounds.y + newBounds.height < screenHeight) {
      mainWindow.setPosition(newBounds.x, screenHeight - newBounds.height);
      mainWindow.setMovable(false);
      setTimeout(() => {
        mainWindow.setMovable(true);
      },500);
      _event.preventDefault();
    } else if (newBounds.y + newBounds.height >= screenHeight - 10 && yBuffer > newBounds.y && newBounds.y + newBounds.height < screenHeight) {
      mainWindow.setPosition(newBounds.x, screenHeight - newBounds.height - 10);
      _event.preventDefault();
    }
  })

  ipcMain.on('open-moments', () => {
    if (momentsWindow) {
      return momentsWindow.show();
    }
    momentsWindow = new BrowserWindow({
      width: 500,
      height: 400,
      autoHideMenuBar: true,
      frame: false,
      show:false,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        preload: path.join(__dirname, '../preload/moments.js'),
      }
    })
    if (momentsWindow && process.env['ELECTRON_RENDERER_URL']) {
      momentsWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/moments.html`)
      // momentsWindow.loadFile(path.join(__dirname, '../../src/renderer/public/moments.html'))
      // momentsWindow.loadFile(path.join(__dirname, '../../src/renderer/index.html'))
      if (!process.env.IS_TEST) momentsWindow.webContents.openDevTools({mode:'detach'});
      // momentsWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/moments`)
      momentsWindow.on('ready-to-show',()=>{
        momentsWindow?.show();
      })
      momentsWindow.on('closed', () => {
        momentsWindow = undefined;
      })
    }
  })

  ipcMain.on('window-hide', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    win?.hide();
  })

  ipcMain.on('window-close', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    win?.close();
  })

  ipcMain.on('window-quit', () => {
    mainWindow.destroy();
    app.quit();
  })

  ipcMain.on('window-minimize', () => {
    mainWindow.minimize();
  })

  ipcMain.on('window-stick', () => {
    const isAlwaysOnTop = mainWindow.isAlwaysOnTop();
    mainWindow.setAlwaysOnTop(!isAlwaysOnTop);
    mainWindow.webContents.send('window-stick', !isAlwaysOnTop);
  })

  ipcMain.on('window-maximize', () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  })
}
