import { Tray, BrowserWindow } from 'electron'
import * as path from 'path'
let rightClickFlag = 0;
let trayWindow: BrowserWindow | undefined;
let trayWindowProps = {
  width: 100,
  height: 170,
  alwaysOnTop: true,
  autoHideMenuBar: true,
  skipTaskbar: true,
  frame: false,
  show:false,
  webPreferences: {
    contextIsolation: false,
    nodeIntegration: true,
    preload: path.join(__dirname, '../preload/tray.js'),
  }
};

export const initTray = (tray, mainWindow) => {
  trayWindow = new BrowserWindow(trayWindowProps)
  if (trayWindow && process.env['ELECTRON_RENDERER_URL']) {
    trayWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/tray.html`)
    if (!process.env.IS_TEST) trayWindow.webContents.openDevTools({mode:'detach'});
  }
  trayWindow.on("blur", () => {
    trayWindow?.hide();
  })
  // 创建任务栏图标
  tray = new Tray(path.join(__dirname, '../../build/icon.png'));

  // 自定义托盘图标的内容菜单
  // const contextMenu = Menu.buildFromTemplate([
  //   {
  //     // 点击退出菜单退出程序
  //     label: '退出',
  //     click: () => {
  //       mainWindow.destroy();
  //       app.quit();
  //     }
  //   },
  //   { type: 'separator' },
  //   {
  //     // 点击退出菜单退出程序
  //     label: '退出',
  //     click: () => {
  //       mainWindow.destroy();
  //       app.quit();
  //     }
  //   }
  // ]);
  tray.setToolTip('e-home');  // 设置鼠标指针在托盘图标上悬停时显示的文本
  // tray.setContextMenu(contextMenu);  // 设置图标的内容菜单
  // 点击托盘图标，显示主窗口
  tray.on('right-click', (_e, f) => {
    console.log(f)
    rightClickFlag = 1;
  });
  tray.on('mouse-move', (_e, f) => {
    if (rightClickFlag === 1) {
      rightClickFlag = 0;
      trayRender(trayWindow, f);
      // tray.popUpContextMenu(contextMenu, {x: f.x + 5, y: f.y - 35});
    }
  });
  tray.on("click", () => {
    mainWindow.setSkipTaskbar(false);
    mainWindow.show();
  })
}

const trayRender = (trayWindow, bounds) => {
  trayWindow?.setBounds({x: bounds.x, y: bounds.y - trayWindowProps.height});
  trayWindow?.show();
};
