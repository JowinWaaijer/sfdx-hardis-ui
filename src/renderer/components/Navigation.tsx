
import * as React from "react";
import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    Drawer,
    DrawerProps,
    Button,
    Link,
    makeStyles,
    tokens,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import {
    createHashRouter,
    RouterProvider,
} from "react-router-dom"
import {Home} from "../pages/Home";
import {Installation} from "../pages/Installation";

const useStyles = makeStyles({
    root: {
        border: "2px solid #ccc",
        overflow: "hidden",
        display: "flex",
        height: "100vh",
        backgroundColor: "#fff",
    },

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
        element: <Home />
    },
    {
        path: "/installation",
        element: <Installation />
    }
]);


export const Navigation = () => {
    const styles = useStyles();

    const [isOpen, setIsOpen] = React.useState(true);
    const [type, setType] = React.useState<DrawerType>("inline");

    const onMediaQueryChange = React.useCallback(
        ({ matches }) => setType(matches ? "overlay" : "inline"),
        [setType]
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
                <DrawerHeader>
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
                        Responsive Drawer
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody>
                    <Link href={`#`}>Home</Link>
                    <Link href={`#installation`}>Installeer dingen</Link>
                </DrawerBody>
            </Drawer>

            <div className={styles.content}>
                <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
                    Toggle
                </Button>

                <RouterProvider router={router}></RouterProvider>
            </div>
        </div>
    );
};