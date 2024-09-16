import {ExecuteCommand} from "@common/CommandTypes";
import {BrowserWindow, app, ipcMain, nativeTheme, type IpcMainEvent} from "electron";
import {join} from "path";
import * as os from 'os';
import { WinShell } from "./WinShell";
import {ContextBridgeApiParam} from "@common/ContextBridge";
import { UnixShell } from "./UnixShell";

//const isMac = os.platform() === "darwin";
const isWindows = os.platform() === "win32";
//const isLinux = os.platform() === "linux";
const shell = isWindows ? new WinShell() : new UnixShell();


const createBrowserWindow = (): BrowserWindow => {
    const preloadScriptFilePath = join(__dirname, "..", "dist-preload", "index.js");

    return new BrowserWindow({
        autoHideMenuBar: true,
        backgroundMaterial: "mica",
        vibrancy: "header",
        webPreferences: {
            preload: preloadScriptFilePath,
            nodeIntegrationInWorker: true
        },
        icon: join(__dirname, "..", "build", "app-icon-dark.png"),
    });
};

const loadFileOrUrl = (browserWindow: BrowserWindow) => {
    if (process.env.VITE_DEV_SERVER_URL) {
        browserWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        browserWindow.loadFile(join(__dirname, "..", "dist-renderer", "index.html"));
    }
};

const registerIpcEventListeners = () => {
    ipcMain.on("themeShouldUseDarkColors", (event: IpcMainEvent) => {
        event.returnValue = nativeTheme.shouldUseDarkColors;
    });

    ipcMain.on("executeCommand", async (event: IpcMainEvent, args: ContextBridgeApiParam) => {
        console.log(`Received execute command with args ${JSON.stringify(args)}`);

        const cmd = args.obj as ExecuteCommand;
        if(cmd.type === 'IS_INSTALLED') {
            cmd.result = await shell.isInstalled(cmd);
            cmd.state = "OK";
            for (const browserWindow of BrowserWindow.getAllWindows()) {
                browserWindow.webContents.send(args.uuid, {uuid: args.uuid, obj: cmd});
            }
        }

    });
};

const registerNativeThemeEventListeners = (allBrowserWindows: BrowserWindow[]) => {
    nativeTheme.addListener("updated", () => {
        for (const browserWindow of allBrowserWindows) {
            browserWindow.webContents.send("nativeThemeChanged");
        }
    });
};

(async () => {
    await app.whenReady();
    registerIpcEventListeners();
    registerNativeThemeEventListeners(BrowserWindow.getAllWindows());
    const mainWindow = createBrowserWindow();
    loadFileOrUrl(mainWindow);
    mainWindow.webContents.openDevTools();
})();
