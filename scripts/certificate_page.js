import { GetElementFromHTML, FetchText } from "./my_utils.js"

export {
    GetCertificateElement,
    ViewCertificate,
    DownloadCertificate,
};

const GetCertificateElement = (certificate) => {
    const certificateDisplayHTML = certificate.isPDF ?
        `<iframe src="${certificate.path}" width="100%" height="500px"></iframe>` :
        `<img src="${certificate.path}" alt="Certificate" style="max-width: 100%; height: auto;">`;

    // const certificateDisplayHTML = `
    //     <div class="project_links">
    //         <a href="${project[projectPath]}/index.html" target="_blank" rel="noopener noreferrer"><button>To Page</button></a>
    //         ${(project[gitHub] !== "None") ? `<a href="${project[gitHub]}" target="_blank" rel="noopener noreferrer"><button>GitHub</button></a>` : ''}
    //     </div>
    // `;
    const certificateActionsHTML = `
        <div class="certificate_links">
            <button id="view_bertificate_btn">View</button>
            <button id="download_certificate_btn">Download</button>
        </div>
    `;

    const element = GetElementFromHTML(`
        <main>
            <section class="certificate_preview">
                <div class="preview">
                    ${certificateDisplayHTML}
                    <div class="certificate_links">
                    </div>
                    ${certificateActionsHTML}
                </div>
            </section>
            
        </main>
    `);

    element.querySelector('#view_bertificate_btn').addEventListener('click', () => ViewCertificate(certificate.path));
    element.querySelector('#download_certificate_btn').addEventListener('click', () => DownloadCertificate(certificate.path, certificate.name));

    return element;
};


const ViewCertificate = (url) => {
    window.open(url, '_blank');
};

const DownloadCertificate = (url, filename) => {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        })
        .catch(e => console.error('Error in downloading file:', e));
};

