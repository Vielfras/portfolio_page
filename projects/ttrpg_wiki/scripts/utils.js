export {
    GetElementFromHTML,
    Random,
    FetchText,
};


function GetElementFromHTML(htmlText) {
    const template = document.createElement('template');
    template.innerHTML = htmlText.trim();

    return template.content.firstElementChild;
}


function Random(min, max) {
    return Math.random() * (max - min) + min;
}

// ---------======================== ASYNC ========================---------

async function FetchText(filePath) {
    const fileContent = await fetch(filePath);
    if (!fileContent.ok) {
        throw new Error(`Error fetching ${filePath}: ${fileContent.status}`);
    }

    return fileContent.text();
}