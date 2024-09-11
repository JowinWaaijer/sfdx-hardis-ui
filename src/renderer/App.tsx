import { FluentProvider, Theme, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import {Navigation} from "./components/Navigation";
import useExecuteCommand from "./hooks/useExecuteCommand";

const shouldUseDarkColors = (): boolean =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const getTheme = () => (shouldUseDarkColors() ? webDarkTheme : webLightTheme);



export const App = () => {
    const [theme, setTheme] = useState<Theme>(getTheme());
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        window.ContextBridge.onNativeThemeChanged(() => setTheme(getTheme()));
    }, []);

    useExecuteCommand("sf", "IS_INSTALLED");

    return (
        <FluentProvider theme={theme} style={{ height: "100vh", background: "transparent" }}>
            <Navigation>

            </Navigation>

        </FluentProvider>);
}
