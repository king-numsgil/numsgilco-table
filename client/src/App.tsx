import {createBrowserHistory, Outlet, ReactLocation, Router} from "@tanstack/react-location";
import {ChakraProvider, ColorModeScript, createStandaloneToast} from "@chakra-ui/react";
import {HelmetProvider} from "react-helmet-async";
import {KBarProvider} from "kbar";
import {FC} from "react";

import {Actions, Menu} from "./components/command";
import {routes} from "./pages";
import {theme} from "./theme";

const {ToastContainer} = createStandaloneToast();

const location = new ReactLocation({
    history: createBrowserHistory(),
});

export const App: FC = () => {
    return <>
        <ToastContainer />
        <ChakraProvider theme={theme} resetCSS>
            <HelmetProvider>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Router location={location} routes={routes}>
                    <KBarProvider
                        options={{
                            enableHistory: true,
                        }}
                        actions={Actions}
                    >
                        <Menu />
                        <Outlet />
                    </KBarProvider>
                </Router>
            </HelmetProvider>
        </ChakraProvider>
    </>;
};
