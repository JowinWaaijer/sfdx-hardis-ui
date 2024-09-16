import { Shell } from "./Shell";
import util from "util";
import child from "child_process";
import { ExecuteCommand } from "@common/CommandTypes";

export class UnixShell implements Shell {
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
                const { stdout, stderr } = await this.exec(`which ${command.command}`);
                if (stdout == null || stderr) return resolve(false);
            } catch (e) {
                console.log(e);
                resolve(false);
            }
            return resolve(true);
        });
    }
}