import type { ContextBridge } from "@common/ContextBridge";
import {contextBridge, ipcRenderer} from "electron";

let validReceivers = []
contextBridge.exposeInMainWorld("ContextBridge", <ContextBridge>{
    onNativeThemeChanged: (callback: () => void) => ipcRenderer.on("nativeThemeChanged", callback),
    themeShouldUseDarkColors: () => ipcRenderer.sendSync("themeShouldUseDarkColors"),
    api: {
        receive: (channel, func) => {
            if (validReceivers.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                validReceivers = validReceivers.filter((receiver) => {
                    return receiver !== channel
                });
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        send: (channel, ...params) => {
            // whitelist channels
            const validChannels = ["executeCommand"];
            if (validChannels.includes(channel)) {
                console.log('Valid channel,,, sending');
                ipcRenderer.send(channel, ...params);
                params.forEach((param) => {
                    validReceivers.push(param.uuid);
                })
            }
        }
    }
});
