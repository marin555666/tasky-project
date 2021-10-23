const path = require("path");
const electron = require("electron");
const TrayTimer = require("./app/timer_tray.js");
const MainWindow = require("./app/main_window.js");

const { app, ipcMain } = electron;

let mainWindow, tray;

app.on("ready", () => {
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName = process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TrayTimer(iconPath, mainWindow);

  mainWindow.onBlur(() => tray.onHide());
});

ipcMain.on("update-timer", (event, timeLeft) => {
  tray.setTitle(timeLeft);
});
