export {
    CreateSearchBar,
    AddListenerToSortOptions,
    AddListenerToCategoryOptions,
    AddListenerToSearchBar,
};

const sortOptionClassName = "sort_by";
const categoryOptionClassName = "product_category";

const searcBarId = "search-dropdown";

const CreateSearchBar = () => {
    const newSearchBar =
        `
        <form>
            <div class="flex bg-neutral-900">
                ${CreateSortDropdownMenu()}
                
                <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Search Entry...</label>
                <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg></button>
                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    ${CreateSearchCategories()}
                </div>
                <div class="relative w-full">
                    <input type="search" id="${searcBarId}" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search products..." required>
                        <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                </div>
            </div>
        </form>
        `;

    return newSearchBar;
}

const AddListenerToSortOptions = (userFunc) => {
    const elmSortOptions = document.querySelectorAll(`.${sortOptionClassName}`);

    elmSortOptions.forEach(sortOption => {
        userFunc(sortOption);
    });
}

const AddListenerToCategoryOptions = (userFunc) => {
    const elmCategoryOptions = document.querySelectorAll(`.${categoryOptionClassName}`);

    elmCategoryOptions.forEach(category => {
        userFunc(category);
    });
}

const AddListenerToSearchBar = (userFunc) => {
    const searchBarElm = document.getElementById('search-dropdown');
    const searchForm = searchBarElm.closest('form');
    userFunc(searchForm, searchBarElm);
}

// =================================== LOCAL ===================================
const CreateSearchCategories = () => {
    const CreateCategory = (type, name) => {
        return `
            <li>
                <button type="button" id="${type}" class="${categoryOptionClassName} inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">${name}</button>
            </li>
            `;
    };

    const categories = [
        ['smartphones', "Smartphones"],
        ['laptops', "Laptops"],
        ['fragrances', "Fragrances"],
        ['skincare', "Skincare"],
        ['groceries', "Groceries"],
        ['home-decoration', "Home Decoration"], //thie is home-decoration instead of home_decoration due to how the dummyjson api works
        ['all', "All"],
    ];

    let categoriesHTML = ''
    categories.forEach(category => {
        categoriesHTML += CreateCategory(...category)
    });

    const newSearchCategories =
        `
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                ${categoriesHTML}
            </ul>
            `;

    return newSearchCategories;
};

const CreateSortDropdownMenu = () => {
    const sortTypes = [
        ['a_z', "A-Z"],
        ['price_low_high', "Price L->H"],
        ['price_high_low', "Price H->L"],
        ['rating_low_high', "Rating L->H"],
        ['rating_high_low', "Rating H->L"],
    ];

    const CreateSortTypeHTML = (type, description) => {
        return `
            <li>
                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input id="${type}" type="radio" value="" name="default-radio" class="${sortOptionClassName} w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="${type}" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">${description}</label>
                </div>
            </li>
        `;
    };

    let sortTypesHTML = '';
    sortTypes.forEach(sort => {
        sortTypesHTML += CreateSortTypeHTML(...sort);
    });

    const sortDropDownMenuHTML = `
    <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" 
    class="min-w-max text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Sort by <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
    </button>

    <div id="dropdownRadioBgHover" class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
        <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioBgHoverButton">
            ${sortTypesHTML}
        </ul>
    </div>
    `;

    return sortDropDownMenuHTML;
};