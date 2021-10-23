const electron = require("electron");
const { app, BrowserWindow } = electron;

const windowOptions = {
  webPreferences: { nodeIntegration: true, contextIsolation: false, backgroundThrottling: false },
  width: 300,
  height: 500,
  frame: false,
  resizable: false,
  show: false,
  skipTaskbar: true,
};

class MainWindow extends BrowserWindow {
  constructor(loadURL) {
    super(windowOptions);
    this.loadURL(loadURL);
    if (process.platform === "darwin") {
      app.dock.hide();
    }

    this.on("blur", this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
