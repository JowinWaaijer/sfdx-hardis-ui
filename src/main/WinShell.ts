import { ExecuteCommand } from "@common/CommandTypes";
import * as child from "child_process";
import * as util from "util";
import { Shell } from "./Shell";

export class WinShell implements Shell {
    exec = util.promisify(child.exec);

    changeDirectory(): Promise<Shell> {
        return Promise.resolve(undefined);
    }

    install(): Promise<Shell> {
        return Promise.resolve(undefined);
    }

    installPlugin(): Promise<Shell> {
        return Promise.resolve(undefined);
    }

    async isInstalled(command: ExecuteCommand): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const { stdout, stderr } = await this.exec(command.command);
                if (stdout == null || stderr) return resolve(false);
            } catch (e) {
                console.log(e);
                resolve(false);
            }
            return resolve(true);
        });
    }
}
