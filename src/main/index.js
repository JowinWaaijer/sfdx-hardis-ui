var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { BrowserWindow, app, ipcMain, nativeTheme } from "electron";
import { join } from "path";
import * as os from 'os';
import { WinShell } from "./WinShell";
import { UnixShell } from "./UnixShell";
//const isMac = os.platform() === "darwin";
var isWindows = os.platform() === "win32";
//const isLinux = os.platform() === "linux";
var shell = isWindows ? new WinShell() : new UnixShell();
var createBrowserWindow = function () {
    var preloadScriptFilePath = join(__dirname, "..", "dist-preload", "index.js");
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
var loadFileOrUrl = function (browserWindow) {
    if (process.env.VITE_DEV_SERVER_URL) {
        browserWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    }
    else {
        browserWindow.loadFile(join(__dirname, "..", "dist-renderer", "index.html"));
    }
};
var registerIpcEventListeners = function () {
    ipcMain.on("themeShouldUseDarkColors", function (event) {
        event.returnValue = nativeTheme.shouldUseDarkColors;
    });
    ipcMain.on("executeCommand", function (event, args) { return __awaiter(void 0, void 0, void 0, function () {
        var cmd, _a, _i, _b, browserWindow;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Received execute command with args ".concat(JSON.stringify(args)));
                    cmd = args.obj;
                    if (!(cmd.type === 'IS_INSTALLED')) return [3 /*break*/, 2];
                    _a = cmd;
                    return [4 /*yield*/, shell.isInstalled(cmd)];
                case 1:
                    _a.result = _c.sent();
                    cmd.state = "OK";
                    for (_i = 0, _b = BrowserWindow.getAllWindows(); _i < _b.length; _i++) {
                        browserWindow = _b[_i];
                        browserWindow.webContents.send(args.uuid, { uuid: args.uuid, obj: cmd });
                    }
                    _c.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
};
var registerNativeThemeEventListeners = function (allBrowserWindows) {
    nativeTheme.addListener("updated", function () {
        for (var _i = 0, allBrowserWindows_1 = allBrowserWindows; _i < allBrowserWindows_1.length; _i++) {
            var browserWindow = allBrowserWindows_1[_i];
            browserWindow.webContents.send("nativeThemeChanged");
        }
    });
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var mainWindow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app.whenReady()];
            case 1:
                _a.sent();
                registerIpcEventListeners();
                registerNativeThemeEventListeners(BrowserWindow.getAllWindows());
                mainWindow = createBrowserWindow();
                loadFileOrUrl(mainWindow);
                mainWindow.webContents.openDevTools();
                return [2 /*return*/];
        }
    });
}); })();
