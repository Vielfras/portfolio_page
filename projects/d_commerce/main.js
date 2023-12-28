'use strict'

import * as MyUtils from "./scripts/my_utils.js"
import * as NavBar from "./scripts/navbar.js"
import * as SearchBar from "./scripts/search_bar.js"
import * as Product from "./scripts/products.js"

// =================================== DOM BUILDER  ===================================
const elmNavBar = MyUtils.GetElementFromHTML(NavBar.CreateNavBar());
document.querySelector("body").prepend(elmNavBar);

const elmSearchBar = MyUtils.GetElementFromHTML(SearchBar.CreateSearchBar());
document.querySelector("nav").after(elmSearchBar);


// =================================== PAGE LOADING ===================================
const elmProducrtContainer = document.querySelector('#product-container');

const DisplayProducts = async (productElements) => {
    currDisplayedProducts = productElements;

    elmProducrtContainer.innerHTML = '';
    elmProducrtContainer.append(...Product.ProductsToHTML(productElements));
}


const SortProductsBy = (products, sortParams) => {
    const sortByAttribute = (attr, direction = 1) => (lhs, rhs) => {
        if (lhs[attr] < rhs[attr]) return -1 * direction;
        if (lhs[attr] > rhs[attr]) return 1 * direction;
        return lhs.title < rhs.title ? -1 : (lhs.title > rhs.title ? 1 : 0);
    };

    const sortFunctions = {
        "a_z": sortByAttribute('title'),
        "price_low_high": sortByAttribute('price'),
        "price_high_low": sortByAttribute('price', -1),
        "rating_low_high": sortByAttribute('rating'),
        "rating_high_low": sortByAttribute('rating', -1)
    };

    if (sortFunctions[sortParams]) {
        products.sort(sortFunctions[sortParams]);
    }
}

const FilterProductsCategory = async (products, category) => {
    if (!category) {
        return;
    }

    if ('all' === category) {
        console.info("Requesting all products.");
        currDisplayedProducts = await Product.GetProductsFromAPI(`${apiPath}`);
        return;
    }

    var filteredProducts = products.filter(product => product.category === category);

    if (0 == filteredProducts.length) {
        console.info("No filtered products to display, getting them from API");
        currDisplayedProducts = await Product.GetProductsFromAPI(`${apiPath}/category/${category}`);
    }
    else {
        currDisplayedProducts = filteredProducts;
    }
}

const UpdatePage = async (newUrl) => {
    const searchString = newUrl.search

    if (searchString) {
        if (0 === currDisplayedProducts.length) {
            console.error("No products to display! Fetching all products.");
            currDisplayedProducts = await Product.GetProductsFromAPI(apiPath);
        }
        const searchParams = new URLSearchParams(newUrl.search);

        var searchQuary = null;
        if ((searchQuary = searchParams.get(categoryParamName)) != null) {
            await FilterProductsCategory(currDisplayedProducts, searchQuary);
        }
        else if (searchQuary = searchParams.get(searchParamName)) {
            // SearchAllProductsFor(searchParams.get(searchParamName);
        }
        else if ((searchQuary = searchParams.get(sortParamName)) != null) {
            SortProductsBy(currDisplayedProducts, searchQuary);
        }
    }
    else {
        // Load home page => all products 
        currDisplayedProducts = await Product.GetProductsFromAPI(apiPath);

        if (0 === allPossibleProduct.length) {
            allPossibleProduct = currDisplayedProducts;
        }
    }

    DisplayProducts(currDisplayedProducts);
}

// =================================== LISTENERS ===================================
const sortParamName = 'sort';
const searchParamName = 'search';
const categoryParamName = 'category';

const sortByListener = (sortType) => {
    sortType.addEventListener('change', () => {
        const currURL = new URL(originalURL);
        currURL.searchParams.append(sortParamName, sortType.id);
        window.history.pushState({}, '', currURL.toString());

        UpdatePage(currURL)
    });
}

const productCategoryListener = (category) => {
    category.addEventListener('click', () => {
        const currURL = new URL(originalURL);
        currURL.searchParams.append(categoryParamName, category.id);
        window.history.pushState({}, '', currURL.toString());

        UpdatePage(currURL)
    });
}

const searchBarListeners = (formElement, searchBar) => {
    searchBar.addEventListener('input', (event) => {
        const inputValue = event.target.value;
        console.log(inputValue);
    });

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputValue = searchBar.value;
        searchBar.value = '';
        console.log("Submit ", inputValue);

        currURL.searchParams.append(searchParamName, inputValue);
        window.history.pushState({}, '', currURL.toString());

        UpdatePage(currURL)
    });
}

// =================================== MAIN ===================================
const apiPath = 'https://dummyjson.com/products';

const currURL = new URL(window.location.href);
const originalURL = currURL.origin + currURL.pathname;

var allPossibleProduct = []
var currDisplayedProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
    UpdatePage(currURL);

    SearchBar.AddListenerToSortOptions(sortByListener)
    SearchBar.AddListenerToCategoryOptions(productCategoryListener)
    SearchBar.AddListenerToSearchBar(searchBarListeners)
});

