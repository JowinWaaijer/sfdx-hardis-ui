import { CommandType, type ExecuteCommand } from "@common/CommandTypes";
import { ContextBridgeApiParam } from "@common/ContextBridge";
import { useEffect, useState } from "react";

const useExecuteCommand = (command: string, type: CommandType) => {
    const [executeCommand, setExecuteCommand] = useState({
        state: "PENDING",
        type: type,
        command: command,
    });

    useEffect(() => {
        const uuid = crypto.randomUUID();
        window.ContextBridge.api.send("executeCommand", { uuid: uuid, obj: executeCommand });
        window.ContextBridge.api.receive(uuid, (data: ContextBridgeApiParam) => {
            console.log("received");
            console.log(JSON.stringify(data));
            setExecuteCommand(data.obj as ExecuteCommand);
        });
    }, []);

    return executeCommand;
};

export default useExecuteCommand;
