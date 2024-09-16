import {
    BrandVariants,
    createDarkTheme,
    createLightTheme,
    FluentProvider,
    Theme
} from "@fluentui/react-components";
import { useEffect, useState } from "react";
import {Navigation} from "./components/Navigation";
import useExecuteCommand from "./hooks/useExecuteCommand";

const shouldUseDarkColors = (): boolean =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const brightfox: BrandVariants = {
    10: "#060201",
    20: "#23130A",
    30: "#3C1C11",
    40: "#502314",
    50: "#662B17",
    60: "#7B321A",
    70: "#92391D",
    80: "#A9411F",
    90: "#C14822",
    100: "#D94F25",
    110: "#F25727",
    120: "#FF6A3B",
    130: "#FF875D",
    140: "#FF9F7D",
    150: "#FFB69B",
    160: "#FFCBB8"
};

const lightTheme: Theme = {
    ...createLightTheme(brightfox),
};

const darkTheme: Theme = {
    ...createDarkTheme(brightfox),
};


darkTheme.colorBrandForeground1 = brightfox[110];
darkTheme.colorBrandForeground2 = brightfox[120];

const getTheme = () => (shouldUseDarkColors() ? darkTheme : lightTheme);



export const App = () => {
    const [theme, setTheme] = useState<Theme>(getTheme());
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        window.ContextBridge.onNativeThemeChanged(() => setTheme(getTheme()));
    }, []);

    const exec = useExecuteCommand("sf", "IS_INSTALLED");
    console.log(exec);
    const ll = useExecuteCommand("git", "IS_INSTALLED");
    console.log(ll);
    return (
        <FluentProvider theme={theme} style={{ height: "100vh", background: "transparent", width: `100%` }}>
            <Navigation>

            </Navigation>

        </FluentProvider>);
}
