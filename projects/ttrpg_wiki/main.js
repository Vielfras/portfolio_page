import * as MyUtils from "./scripts/utils.js"
import { FolderManager } from "./scripts/folder_manager.js"
import { NavbarStackManager } from "./scripts/nav_bar_stack.js"

const ROOT_FOLDER = 'markdown_files/'

const NAVBAR = document.getElementById("navbar");
const navBarStack = new NavbarStackManager(NAVBAR);


// Handles hiding the navbar when scrolling down
document.addEventListener("DOMContentLoaded", () => {
    let previousScrollPosition = window.pageYOffset;

    window.addEventListener("scroll", () => {
        const currentScrollPosition = window.pageYOffset;
        if (previousScrollPosition > currentScrollPosition) {
            NAVBAR.classList.remove("hide-navbar");
        } else {
            NAVBAR.classList.add("hide-navbar");
        }
        previousScrollPosition = currentScrollPosition;
    });
});



async function XMLFolderHierarchyToDOM(path) {
    const xmlText = await MyUtils.FetchText(path);
    const parser = new DOMParser();
    return parser.parseFromString(xmlText, "application/xml");
}


async function PopulateInitialNavBar(folderManager, folder) {
    const navbar = document.getElementById("navbar");
    const navbarStackManager = new NavbarStackManager(navbar, folderManager);

    const folderPaths = folder.map(entry => entry.path);
    await navbarStackManager.ClearAndRepopulate(folderPaths);
}

async function EnterFolder() {

}



(async function () {
    try {
        const xmlDoc = await XMLFolderHierarchyToDOM("structure.xml");

        const folderManager = new FolderManager(xmlDoc);

        PopulateInitialNavBar(folderManager, folderManager.GetRootNamesAndPaths());

    } catch (error) {
        console.error(error);
        document.getElementById("content").innerHTML = "Error loading folder structure.";
    }
})();


