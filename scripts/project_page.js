import { GetElementFromHTML } from "./my_utils.js"

export {
    GetProjectPageMainElement,
};

const GetProjectPageMainElement = (projectName) => {
    const iFrameHTML = `
            <section id="project_preview">
                <div id="preview">
                    <iframe src="../../web_dev_experiments/games/mvp_turn_based_combat/index.html" width="100%" height="500px"></iframe>
                    <a href="http://127.0.0.1:5500/projects/portfolio/index.html#" target="_blank"><button>Go To Page</button></a>
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


