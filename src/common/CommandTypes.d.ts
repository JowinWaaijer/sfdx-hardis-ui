export type CommandType = "IS_INSTALLED" | "INSTALL_PLUGIN" | "INSTALL_SOFTWARE" | "CHANGE_DIR";
export type ExecuteCommand = {
    type: CommandType;
    state: 'PENDING' | 'NOK' | 'OK';
    command: string;
    result?: string | boolean;
    opts?: string[];
};
