import { shell } from 'electron'
let xBuffer: number = 0;
let yBuffer: number = 0;

export const listenMain = (mainWindow) => {
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.on("close", (e) => {
    e.preventDefault();  // 阻止退出程序
    mainWindow.setSkipTaskbar(true);   // 取消任务栏显示
    mainWindow.hide();    // 隐藏主程序窗口
  })

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send('window-maximize');
  })

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send('window-maximize');
  })

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send('window-unmaximize');
  })

  mainWindow.on("will-move", (_event, newBounds) => {
    // const [x, y] = mainWindow.getPosition();
    if ((newBounds.x <= 10 && newBounds.x > 0 && xBuffer > newBounds.x) || (newBounds.x < 0 && newBounds.x >= -10 && xBuffer < newBounds.x)) {
      mainWindow.setPosition(0, newBounds.y);
      mainWindow.setMovable(false);
      setTimeout(() => {
        mainWindow.setMovable(true);
      },500);
      _event.preventDefault();
    } else if (newBounds.x <= 10 && newBounds.x > 0 && xBuffer < newBounds.x) {
      mainWindow.setPosition(10, newBounds.y);
      _event.preventDefault();
    }

    if (newBounds.y <= 10 && newBounds.y > 0 && yBuffer > newBounds.y) {
      mainWindow.setPosition(newBounds.x, 0);
      _event.preventDefault();
      mainWindow.setMovable(false);
      setTimeout(() => {
        mainWindow.setMovable(true);
      },500);
    } else if (newBounds.y <= 10 && newBounds.y > 0 && yBuffer < newBounds.y) {
      mainWindow.setPosition(newBounds.x, 10);
      _event.preventDefault();
    }

    // 屏蔽窗口菜单（-webkit-app-region: drag）
    mainWindow.hookWindowMessage(278, () => {
      console.log(123)
      mainWindow.setEnabled(false)
      setTimeout(() => {
        mainWindow.setEnabled(true)
      }, 150)

      return true
    })

    mainWindow.webContents.send('window-moved', newBounds, xBuffer, yBuffer);
    yBuffer = newBounds.y;
    xBuffer = newBounds.x;
  })
}
