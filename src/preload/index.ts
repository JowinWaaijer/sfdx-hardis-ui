import type {ContextBridge} from "@common/ContextBridge";
import {contextBridge, ipcRenderer} from "electron";

const validReceivers = []
contextBridge.exposeInMainWorld("ContextBridge", <ContextBridge>{
    onNativeThemeChanged: (callback: () => void) => ipcRenderer.on("nativeThemeChanged", callback),
    themeShouldUseDarkColors: () => ipcRenderer.sendSync("themeShouldUseDarkColors"),
    api: {
        receive: (channel, func) => {
            if (validReceivers.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        send: (channel, ...params) => {
            // whitelist channels
            let validChannels = ["executeCommand"];
            if (validChannels.includes(channel)) {
                console.log('Valid channel,,, sending');
                ipcRenderer.send(channel, ...params);
                params.forEach((param) => {
                    validChannels.push(param.uuid);
                })
            }
        }
    }
});
