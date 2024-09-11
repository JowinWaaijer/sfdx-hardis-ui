export type ContextBridgeApiParam = {
    uuid: string;
    obj: object
}

export type ContextBridge = {
    onNativeThemeChanged: (callback: () => void) => void;
    themeShouldUseDarkColors: () => boolean;
    api: {
        send:(channel: string, ...params: Array<ContextBridgeApiParam>) => void,
        receive:(channel: string, func: Function) => void
    }
};


