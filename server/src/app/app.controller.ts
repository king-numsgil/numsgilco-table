import {Context, controller, Get, HttpResponseNotFound, IAppController, render} from "@foal/core";
import {ApiController} from "./controllers";
import * as process from "process";
import {readFile} from "fs/promises";

export class AppController implements IAppController {
    subControllers = [
        controller("/api", ApiController),
    ];

    @Get('*')
    async renderApp(ctx: Context) {
        if (!ctx.request.accepts("html")) {
            return new HttpResponseNotFound();
        }

        let scripts;
        if (process.env.NODE_ENV === "production") {
            const file = await readFile("public/manifest.json");
            const json = JSON.parse(file.toString());
            scripts = `<script type="module" src="${json["src/main.tsx"].file}"></script>`;
        } else {
            scripts = `<script type="module">
                import RefreshRuntime from 'http://localhost:5173/@react-refresh'
                RefreshRuntime.injectIntoGlobalHook(window)
                window.$RefreshReg$ = () => {}
                window.$RefreshSig$ = () => (type) => type
                window.__vite_plugin_react_preamble_installed__ = true
            </script>
            <script type="module" src="http://localhost:5173/@vite/client"></script>
            <script type="module" src="http://localhost:5173/src/main.tsx"></script>`;
        }
        return render("./templates/index.html", {
            scripts,
        });
    }
}
