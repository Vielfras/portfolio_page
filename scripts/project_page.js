import { GetElementFromHTML } from "./my_utils.js"

export {
    GetProjectPageMainElement,
};

const projectPath = "projectPath";
const gitHub = "gitHub";

const GetProjectPageMainElement = async (project) => {
    const iFrameHTML = project[gitHub] !== "None" ?
    `
            <section class="project_preview">
                <div class="preview">
                    <iframe src="${project[projectPath]}/index.html" width="100%" height="500px"></iframe>
                    <div class="project_links">
                        <a href="${project[projectPath]}/index.html" target="_blank" rel="noopener noreferrer"><button>To Page</button></a>
                        <a href="${project[gitHub]}" target="_blank" rel="noopener noreferrer"><button>GitHub</button></a>
                    </div>
                </div>
            </section>
    `
    :
    `
            <section class="project_preview">
                <div class="preview">
                    <iframe src="${project[projectPath]}/index.html" width="100%" height="500px"></iframe>
                    <div class="project_links">
                        <a href="${project[projectPath]}/index.html" target="_blank" rel="noopener noreferrer"><button>To Page</button></a>
                    </div>
                </div>
            </section>
    `
    ;

    const readmeMD = await FetchText(`${project[projectPath]}/README.md`)
    const projectDescriptionHTML = `
            <section class="project_details">
                <div class="project_intro">
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

