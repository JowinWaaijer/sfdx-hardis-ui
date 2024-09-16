import { Shell } from "./Shell";
import child from "child_process";
import { ExecuteCommand } from "@common/CommandTypes";
export declare class UnixShell implements Shell {
    exec: typeof child.exec.__promisify__;
    changeDirectory(): Promise<Shell>;
    install(): Promise<Shell>;
    installPlugin(): Promise<Shell>;
    isInstalled(command: ExecuteCommand): Promise<boolean>;
}
