export {
    GenerateCharacterPickingPage,
};

const characterSelectedEventName = 'characterSelected';
const characterSelectedEvent = new Event(characterSelectedEventName);

async function GenerateCharacterPickingPage(characterMap) {
    const nameInput = document.querySelector('#name-input');
    nameInput.addEventListener('keyup', () => {
        FilterNames(characterMap);
    });

    const selectNames = document.querySelector('#name-select');
    Object.keys(characterMap).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        selectNames.appendChild(option);
    });

    selectNames.addEventListener('change', () => {
        nameInput.value = selectNames.value;
    });

    const confirmButton = document.querySelector('#confirm-button');
    const mainContent = document.querySelector('main');

    confirmButton.addEventListener('click', async () => {
        const characterSelection = document.querySelector(".welcome-container");

        characterSelection.classList.add('removed');
        mainContent.classList.remove('hidden');

        const selectedCharacter = selectNames.value;

        characterSelectedEvent.character = selectedCharacter;
        document.dispatchEvent(characterSelectedEvent);
    });

    return characterSelectedEventName;
}


/*-----------------------------------------------------------------------------
                                   PRIVATE
 ----------------------------------------------------------------------------*/
function FilterNames(characterMap) {
    const input = document.querySelector('#name-input');
    const filter = input.value.toUpperCase();
    const select = document.getElementById('name-select');

    const filteredOptions = Object.keys(characterMap).filter(option => option.toUpperCase().includes(filter));
    filteredOptions.sort((a, b) => {
        return a.toUpperCase().indexOf(filter) - b.toUpperCase().indexOf(filter);
    });

    select.innerHTML = '';
    filteredOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;

        optionElement.addEventListener('change', () => {
            input.value = selectNames.value;
        });
    
        select.appendChild(optionElement);
    });
}