import { GetElementFromHTML, FetchText } from "./my_utils.js"

export {
    GetProjectPageMainElement,
};

const projectPath = "projectPath";
const gitHub = "gitHub";

const GetProjectPageMainElement = async (project) => {
    const projectLinksHTML = `
        <div class="project_links">
            <a href="${project[projectPath]}/index.html" target="_blank" rel="noopener noreferrer"><button>To Page</button></a>
            ${(project[gitHub] !== "None") ? `<a href="${project[gitHub]}" target="_blank" rel="noopener noreferrer"><button>GitHub</button></a>` : ''}
        </div>
    `;

    const iFrameHTML = project[gitHub] !== "None" ?
        `
            <section class="project_preview">
                <div class="preview">
                    <iframe src="${project[projectPath]}/index.html" width="100%" height="500px"></iframe>
                    ${projectLinksHTML}
                </div>
            </section>
    `
        :
        `
            <section class="project_preview">
                <div class="preview">
                    <iframe src="${project[projectPath]}/index.html" width="100%" height="500px"></iframe>
                    ${projectLinksHTML}
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





