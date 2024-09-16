import {
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    DrawerProps,
    Link,
    makeStyles,
    tokens,
    typographyStyles,
} from "@fluentui/react-components";
import { Dismiss24Regular, NavigationRegular } from "@fluentui/react-icons";
import * as React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { Installation } from "../pages/Installation";

const useStyles = makeStyles({
    root: {
        border: "2px solid #ccc",
        overflow: "hidden",
        display: "flex",
        flexGrow: 1,
        height: "100vh",
        backgroundColor: "#fff",
    },
    title: typographyStyles.title3,
    content: {
        margin: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
        flex: "1",

        gridRowGap: tokens.spacingVerticalXXL,
    },
});

type DrawerType = Required<DrawerProps>["type"];

const router = createHashRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/installation",
        element: <Installation />,
    },
]);

export const Navigation = () => {
    const styles = useStyles();

    const [isOpen, setIsOpen] = React.useState(true);
    const [type, setType] = React.useState<DrawerType>("inline");

    const onMediaQueryChange = React.useCallback(
        ({ matches }) => {
            setType(matches ? "overlay" : "inline");
        },
        [setType],
    );

    React.useEffect(() => {
        const match = window.matchMedia("(max-width: 720px)");
        if (match.matches) {
            setType("overlay");
        }
        match.addEventListener("change", onMediaQueryChange);
        return () => match.removeEventListener("change", onMediaQueryChange);
    }, [onMediaQueryChange]);

    return (
        <div className={styles.root}>
            <Drawer
                type={type}
                separator
                position="start"
                open={isOpen}
                onOpenChange={(_, { open }) => setIsOpen(open)}
            >
                <DrawerHeader style={{backgroundColor: `${tokens.colorBrandBackground2}`}}>
                    <DrawerHeaderTitle
                        action={
                            <Button
                                appearance="subtle"
                                aria-label="Close"
                                icon={<Dismiss24Regular />}
                                onClick={() => setIsOpen(false)}
                            />
                        }
                    >
                        Brightfox Deployer
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody>
                    <Link href={`#`}>Home</Link>
                    <Link href={`#installation`}>Installeer dingen</Link>
                </DrawerBody>
            </Drawer>

            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
                <div style={{ display: "flex", flexGrow: 1, backgroundColor: `${tokens.colorBrandBackground2}`, alignContent: "stretch" }}>
                    {!isOpen && (
                        <NavigationRegular
                            style={{
                                fontSize: `${tokens.fontSizeHero800}`,
                                padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
                            }}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    )}
                </div>
                <div style={{padding: `${tokens.spacingVerticalXL}`}}>
                    <RouterProvider router={router}></RouterProvider>
                </div>
            </div>
        </div>
    );
};
