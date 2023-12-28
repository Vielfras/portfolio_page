import { GetElementFromHTML } from "./my_utils.js"

export {
    GetProjectPageMainElement,
};

const GetProjectPageMainElement = (projectPath, projectDescriptionMDfilePath) => {
    const iFrameHTML = `
            <section id="project_preview">
                <div id="preview">
                    <iframe src="${projectPath}" width="100%" height="500px"></iframe>
                    <a href="${projectPath}" target="_blank" rel="noopener noreferrer"><button>Go To Page</button></a>
                </div>
            </section>
    `;

    const projectDescriptionHTML = `
            <section id="project_details">
                <div id="project_intro">
                    <h1>Project Name</h1>
                    <h4>HTML - CSS - JS</h4>
                    <p>Describe the project here...</p>
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


