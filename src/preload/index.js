var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { contextBridge, ipcRenderer } from "electron";
var validReceivers = [];
contextBridge.exposeInMainWorld("ContextBridge", {
    onNativeThemeChanged: function (callback) { return ipcRenderer.on("nativeThemeChanged", callback); },
    themeShouldUseDarkColors: function () { return ipcRenderer.sendSync("themeShouldUseDarkColors"); },
    api: {
        receive: function (channel, func) {
            if (validReceivers.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                validReceivers = validReceivers.filter(function (receiver) {
                    return receiver !== channel;
                });
                ipcRenderer.on(channel, function (event) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return func.apply(void 0, args);
                });
            }
        },
        send: function (channel) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            // whitelist channels
            var validChannels = ["executeCommand"];
            if (validChannels.includes(channel)) {
                console.log('Valid channel,,, sending');
                ipcRenderer.send.apply(ipcRenderer, __spreadArray([channel], params, false));
                params.forEach(function (param) {
                    validReceivers.push(param.uuid);
                });
            }
        }
    }
});
