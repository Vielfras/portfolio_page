'use strict';

import { ServerManager } from "./backend/server_handler.js";
import { GenerateCharacterPickingPage } from "./page_scripts/welcome_page.js";
import { InitCharacterPage } from "./page_scripts/character_page.js";

const g_ip = "127.0.0.1";
const g_port = 9090;

const ConnectToServer = async () => {
    const server = await ServerManager.New(g_ip, g_port);
    return server;
}

const server = await ConnectToServer();


/*-----------------------------------------------------------------------------
                                   DOM CONTENT LOADED
 ----------------------------------------------------------------------------*/
const Main = async () => {
    const characterSelectedEventName = await GenerateCharacterPickingPage(await server.FetchCharacterNames());
     
    document.addEventListener(characterSelectedEventName, async (e) => {
        await InitCharacterPage(server, e.character);
    });
};

document.addEventListener('DOMContentLoaded', async function () {
    Main()
});


