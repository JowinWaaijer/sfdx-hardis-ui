import {useEffect, useState} from "react";
import {CommandType, type ExecuteCommand} from "@common/CommandTypes";


const useExecuteCommand = (command: string, type: CommandType) => {
    const [executeCommand, setExecuteCommand] = useState({
        state: "PENDING",
        type: type,
        command: command,
        uuid: crypto.randomUUID()
    });

    useEffect(() => {
        window.ContextBridge.api.send("executeCommand", {uuid: executeCommand.uuid, obj: executeCommand});
        window.ContextBridge.api.receive(executeCommand.uuid, (data: ExecuteCommand) => {
           console.log('received');
           console.log(data);
        });
    }, [])



    return executeCommand
}


export default useExecuteCommand;