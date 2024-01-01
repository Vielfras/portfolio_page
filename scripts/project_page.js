import { GetElementFromHTML } from "./my_utils.js"

export {
    GetProjectPageMainElement,
};

const GetProjectPageMainElement = async (projectPath) => {
    const iFrameHTML = `
            <section id="project_preview">
                <div id="preview">
                    <iframe src="${projectPath}/index.html" width="100%" height="500px"></iframe>
                    <a href="${projectPath}/index.html" target="_blank" rel="noopener noreferrer"><button>Go To Page</button></a>
                </div>
            </section>
    `;

    const readmeMD = await FetchText(`${projectPath}/README.md`)
    const projectDescriptionHTML = `
            <section id="project_details">
                <div id="project_intro">
                    ${marked.parse(readmeMD)}
                </div>
            </section>
    `;

    return GetElementFromHTML(`
            <main>
                ${iFrameHTML}
                ${projectDescriptionHTML}
            </main>
        `);
};



async function FetchText(filePath) {
    const fileContent = await fetch(filePath);
    if (!fileContent.ok) {
        throw new Error(`Error fetching ${filePath}: ${fileContent.status}`);
    }

    return fileContent.text();
}

