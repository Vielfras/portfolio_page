import * as MyUtils from "./scripts/my_utils.js"

const createNewNoteElement = (noteId, startingText) => {
    const creationDate = MyUtils.GetCurrentDate() + " " + MyUtils.GetCurrentTime();
    const tags = noteId;

    const newNote = MyUtils.GetElementFromHTML(`
        <div id="${noteId}" class="note">
            <div class="menu-container">
                <button class="markdown_view_toggle_btn">&#128065;</button>
                <button class="menu-icon"></button>
            </div>
            <div class="note-header hide">
                <div class="meta-data">
                    <span class="date-line">Created: <span id="creation-date">${creationDate}</span></span>
                    <span class="tags-line">Tags: <span id ="tags">${tags}</span>
                </div>
            </div>
            <div class="note-content">
                <div class="wysiwyg hide"></div>
                <textarea class="note-textarea" placeholder="Write markdown here...">${startingText}</textarea>
            </div>
        </div>
    `);

    const textarea = newNote.querySelector('.note-textarea');
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    });

    const menuIcon = newNote.querySelector('.menu-icon');
    const noteHeader = newNote.querySelector('.note-header');
    menuIcon.addEventListener('click', () => {
        noteHeader.classList.toggle('hide');
        menuIcon.classList.toggle('flip');
    });

    const markedToggle = newNote.querySelector('.markdown_view_toggle_btn');
    const wysiwyg = newNote.querySelector('.wysiwyg');

    markedToggle.addEventListener('click', () => {
        if (wysiwyg.classList.toggle('hide')) {
            textarea.classList.toggle('hide');
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
        else {
            textarea.classList.toggle('hide');
            const parsedMarkdown = marked.parse(textarea.value.replace(/\r\n/g, '\n'));

            wysiwyg.innerHTML = parsedMarkdown;
            wysiwyg.querySelectorAll('a').forEach((a) => a.setAttribute('target', '_blank'));

            textarea.style.height = 'auto';
            textarea.style.height = `${wysiwyg.scrollHeight}px`;
        }
    });

    setTimeout(() => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, 0);

    return newNote;
}

const infinityScroller = document.getElementById("ever_note_container");
const addNewNoteToScroller = document.getElementById("new_note_btn");

let noteCounter = 0;
const exampleMarkdown = `
# Example Markdown  
### Press the eye icon to preview
Pressing the diagonal line will display note metadata.

<br>   

The following is a link to a great site to practice touch typing [MonkeyType](https://monkeytype.com/).   

![Pokemon](https://assets.pokemon.com/assets/cms2/img/pokedex/full/360.png)

**Table Example**

| A | B | C |   
|:---|:---:|---:|     
| a | b | 1 |       
| c | d | 2 |   
| e | f | 3 |
`;

const exampleNote = createNewNoteElement(`note_${noteCounter}`, exampleMarkdown);

infinityScroller.appendChild(exampleNote);

addNewNoteToScroller.addEventListener('click', () => {
    ++noteCounter;

    const newNote = createNewNoteElement(`note_${noteCounter}`, "Write markdown here...");
    infinityScroller.appendChild(newNote);

    newNote.querySelector('.note-textarea').focus();
});
