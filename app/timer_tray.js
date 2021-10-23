const electron = require("electron");
const { app, Tray, Menu, BrowserWindow } = electron;

class TrayTimer extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow;
    this.setToolTip("Timer App");
    this.on("click", this.onClick.bind(this));
    if (process.platform === "darwin" || process.platform == "win32") {
      this.on("right-click", this.onRightClick.bind(this));
    } else {
      this.menuTemplate = [
        {
          label: "Show",
          click: () => this.onClick(),
        },
        {
          label: "Quit",
          click: () => app.quit(),
        },
      ];
      this.setMenu();
    }
  }

  onClick(event, bounds) {
    const { x, y } = electron.screen.getCursorScreenPoint();
    // Window height and width
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      if (process.platform === "linux") {
        this.menuTemplate[0].label = "Show";
        this.setMenu();
      }
      this.mainWindow.hide();
    } else {
      if (process.platform === "linux") {
        this.menuTemplate[0].label = "Hide";
        this.setMenu();
      }
      const yPosition = process.platform === "darwin" ? y : y - height;
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width,
      });
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ]);

    this.popUpContextMenu(menuConfig);
  }

  setMenu() {
    const menuConfig = Menu.buildFromTemplate(this.menuTemplate);
    this.setContextMenu(menuConfig);
  }

  onHide() {
    if (process.platform === "linux") {
      this.menuTemplate[0].label = "Show";
      this.setMenu();
    }
  }
}

module.exports = TrayTimer;
