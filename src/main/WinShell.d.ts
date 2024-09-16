import { ExecuteCommand } from "@common/CommandTypes";
import * as child from "child_process";
import { Shell } from "./Shell";
export declare class WinShell implements Shell {
    exec: typeof child.exec.__promisify__;
    changeDirectory(): Promise<Shell>;
    install(): Promise<Shell>;
    installPlugin(): Promise<Shell>;
    isInstalled(command: ExecuteCommand): Promise<boolean>;
}
