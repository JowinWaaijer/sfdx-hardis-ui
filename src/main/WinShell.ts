import {Shell} from "./Shell";
import * as util from 'util';
import * as child from 'child_process';
import { ExecuteCommand } from "@common/CommandTypes";


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
            const {stdout, stderr}  = await this.exec(command.command);


            if(stdout == null || stderr) return resolve(false);

            return resolve(true);
        });
    }



}