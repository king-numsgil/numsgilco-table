import {createBrowserHistory, Outlet, ReactLocation, Router} from "@tanstack/react-location";
import {ChakraProvider, ColorModeScript, createStandaloneToast} from "@chakra-ui/react";
import {HelmetProvider} from "react-helmet-async";
import {FC} from "react";

import {StoreProvider} from "./state";
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
                <StoreProvider>
                    <Router location={location} routes={routes}>
                        <Outlet />
                    </Router>
                </StoreProvider>
            </HelmetProvider>
        </ChakraProvider>
    </>;
};
