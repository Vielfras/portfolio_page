'use strict';

export {
    FolderManager,
};
class FolderManager {
    constructor(xmlDoc) {
        this.xmlDoc = xmlDoc;
    }

    //Returned in sorted by file/folder name
    GetRootNamesAndPaths() {
        const elements = [...this.xmlDoc.querySelector('folders').children];
        const namesAndPaths = [];

        elements.forEach(element => {
            const name = element.getAttribute('name');
            const path = this.GetPath(element);
            namesAndPaths.push({ name, path });
        });

        return namesAndPaths.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Get the names and paths of all files and folders at a specific level
    GetLevelNamesAndPaths(level) {
        const elements = this.xmlDoc.querySelectorAll(`${level} > *`);
        const namesAndPaths = [];

        elements.forEach(element => {
            const name = element.getAttribute('name');
            const path = this.GetPath(element);
            namesAndPaths.push({ name, path });
        });

        return namesAndPaths;
    }

    // Get the names and paths of all files and folders in the first level of a specific folder
    GetFirstLevelNamesAndPaths(folderName) {
        const folderElement = this.xmlDoc.querySelector(`folder[name='${folderName}']`);

        const elements = folderElement.querySelectorAll(':scope > *');
        const namesAndPaths = [];

        elements.forEach(element => {
            const name = element.getAttribute('name');
            const path = this.GetPath(element);
            namesAndPaths.push({ name, path });
        });

        return namesAndPaths.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Helper function to get the full path of an element
    GetPath(element) {
        const name = element.getAttribute('name');
        let path = name;

        while (element.parentNode && element.parentNode.getAttribute) {
            const parentName = element.parentNode.getAttribute('name');
            if (parentName) {
                path = `${parentName}/${path}`;
            }
            element = element.parentNode;
        }

        return path;
    }
}
