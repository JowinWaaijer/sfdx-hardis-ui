import { ExecuteCommand } from "@common/CommandTypes";
export type Shell = {
    isInstalled: (command: ExecuteCommand) => Promise<boolean>;
    changeDirectory: () => Promise<Shell>;
    install: () => Promise<Shell>;
    installPlugin: () => Promise<Shell>;
};
