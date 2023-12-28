export {
    CreateNavBar,
    ToggleCurrentSelection,
};


const CreateNavBar = () => {
    const newNavBarEle =
        `<nav class="bg-white border-gray-200 dark:bg-gray-900 border-b-2 border-sky-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://oksman.netlify.app" target="_blank" class="flex items-center">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Oksman</span>
            </a>
            <div class="flex items-center md:order-2">
         
                ${CreateProfileLogo()}
                ${CreateDropDownMenu('Eli Oksman', 'vielfras@gmail.com')}
                ${CreateHamburgerNavIcon()}

            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                ${CreatNavLinkList()}
            </div>

        </div>
    </nav>
        `;

    return newNavBarEle;
}


const CreateDropDownMenu = (name, email) => {

    const dropDownMenu =
        `
        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown">
            <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white">${name}</span>
                <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">${email}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >Dashboard</a>
                </li>
                <li>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li>
                <li>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                        out</a>
                </li>
            </ul>
        </div>
        `;

    return dropDownMenu;
}

const CreateHamburgerNavIcon = () => {
    const hamburgerButton =
        `
    <button data-collapse-toggle="navbar-user" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-user" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15" />
        </svg>
    </button>
    `;

    return hamburgerButton;
}

const CreateProfileLogo = () => {
    const profileLogo =
        `
    <button type="button"
        class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom">
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 rounded-full" src="../assets/selfie.jpg"
            alt="user photo">
    </button>
    `;

    return profileLogo;
}

const CreatNavLinkList = () => {
    const addListEntry = (tabindex, id, text, url) => {
        const newLi =
            `
        <li id="nav_${id}" tabindex="${tabindex}">
        <a href="#"
            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">${text}</a>
        </li>
        `;

        return newLi;
    }

    let tabIndex = 0;
    const newNavList =
        `
        <ul id="nav_list"
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            ${addListEntry(tabIndex++, 'home', 'Home', 'home')}
            ${addListEntry(tabIndex++, 'about', 'About', 'home')}
            ${addListEntry(tabIndex++, 'services', 'Services', 'home')}
            ${addListEntry(tabIndex++, 'pricing', 'Pricing', 'home')}
            ${addListEntry(tabIndex++, 'contact', 'Contact', 'home')}
        </ul>
        `;

    return newNavList;
}

const ToggleCurrentSelection = (selectionId) => {
    const elmNavList = document.querySelector("#nav_list");
    const listItems = elmNavList.querySelectorAll('li');

    listItems.forEach(li => {
        const anchor = li.querySelector('a');
        if (li.id == selectionId) {
            console.log(li.id);
            anchor.setAttribute('aria-current', 'page');
            anchor.focus({ focusVisible: true });
        } else {
            anchor.removeAttribute('aria-current');
        }
    });

    elmNavList.innerHTML = '';
    elmNavList.append(...listItems);

    // console.log(listItems);
}