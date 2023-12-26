'use strict';

export {
    FetchJSON,
    GetElementFromHTML,
};

async function FetchJSON(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Error fetching ${filePath}: ${response.status}`);
    }
    return await response.json();
}

function GetElementFromHTML(htmlText) {
    const template = document.createElement('template');
    template.innerHTML = htmlText.trim();

    return template.content.firstElementChild;
}
