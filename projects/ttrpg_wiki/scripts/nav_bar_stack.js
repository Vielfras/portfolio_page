'use strict';

import * as MyUtils from "./utils.js";
import { FolderManager } from "./folder_manager.js"

export {
    NavbarStackManager,
};

class NavbarStackManager {
    constructor(navbarElement, folderManager) {
        this.navbarElement = navbarElement;
        this.folderManager = folderManager;
        this.stack = [];
    }

    SaveCurrentLayout() {
        const savedLayout = Array.from(this.navbarElement.children)
            .filter(child => child.id !== 'btn-back')
            .map(child => child.getAttribute('data-path'));
        this.stack.push(savedLayout);
    }

    async LoadPreviousLayout() {
        if (this.stack.length > 1) {
            console.log("Loading Previous Layout");
            this.stack.pop();
            const previousLayout = this.stack.pop();
            await this.ClearAndRepopulate(previousLayout);
            this.AddBackButton();
        }
    }

    async ClearAndRepopulate(paths) {
        this.Clear();

        var isAFileDisplayed = false;

        for (const path of paths) {
            const isMdFile = path.includes('.md');

            if (!isAFileDisplayed && isMdFile) {
                try {
                    const fileContent = await MyUtils.FetchText(path);
                    document.getElementById("content-container").innerHTML = marked.parse(fileContent);
                    isAFileDisplayed = true;
                } catch (error) {
                    console.error(error);
                    document.getElementById("content-container").innerHTML = "Error loading file.";
                }
            }

            const entry = { name: path.split('/').pop(), path: path };
            const newFolderButton = MyUtils.GetElementFromHTML(`<button data-path="${entry.path}" id="btn-${entry.name}" class="top-folder-btn">${entry.name}</button>`);

            if (isMdFile) {
                newFolderButton.addEventListener('click', async () => {
                    const fileContent = await MyUtils.FetchText(path);
                    document.getElementById("content-container").innerHTML = marked.parse(fileContent);
                });
            }
            else {
                newFolderButton.addEventListener('click', async () => {
                    // this.SaveCurrentLayout();
                    const folderContents = await this.folderManager.GetFirstLevelNamesAndPaths(entry.name);
                    await this.ClearAndRepopulate(folderContents.map(item => item.path));
                    this.AddBackButton();
                });
            }

            this.navbarElement.appendChild(newFolderButton);
        }

        this.SaveCurrentLayout();
    }

    Clear() {
        while (this.navbarElement.firstChild) {
            this.navbarElement.firstChild.remove();
        }
    }

    AddBackButton() {
        if (!document.getElementById("btn-back")) {
            const backButton = MyUtils.GetElementFromHTML(`<button id="btn-back" class="top-folder-btn">Back</button>`);
            backButton.addEventListener("click", () => {
                this.LoadPreviousLayout();
            });

            this.navbarElement.appendChild(backButton);
        }
    }
}
