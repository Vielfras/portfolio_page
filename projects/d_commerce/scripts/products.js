import * as MyUtils from "./my_utils.js"

export {
    GetProductsFromAPI,
    ProductsToHTML,
};

const GetProductsFromAPI = async (serverPath) => {
    const response = await MyUtils.FetchJSON(serverPath);
    const products = [];
    response["products"].forEach(product => {
        products.push(product);
    });
    return products;
};

const ProductsToHTML = (products) => {
    const elmProducts = [];
    products.forEach(product => {
        elmProducts.push(CreateProductCard(product));
    });

    return elmProducts;
}

// =================================== LOCAL ===================================
const CreateProductCard = (product) => {
    const title = product['title'];
    const thumbnail = product['thumbnail'];
    const starRating = GetStarRatingElement(product);
    const price = product['price'];

    const productHTML = `
    <div
    class="object-center w-full hover:scale-110  max-w-sm bg-white border border-gray-200 hover:border-stone-400 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
        <a href="#">
            <img class="object-contain p-1 w-full h-64 rounded-2xl" src=${thumbnail} alt="product image" />
        </a>
        <div class="px-5 pb-5">
            <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${title}</h5>
            </a>
            <div class="flex items-center mt-2.5 mb-5">
                ${starRating}
                <span
                    class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">${product['rating']}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">$${price}</span>
                <a href="#"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                    to cart</a>
            </div>
        </div>
    </div>
    `;

    return MyUtils.GetElementFromHTML(productHTML);
};

const GetStarRatingElement = (product) => {
    const yellowStar = `
    <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
    fill="currentColor" viewBox="0 0 22 20">
        <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
    `;

    const emptyStar = `
    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
    `;

    const maxRating = 5;
    let starRating = '';
    for (let i = 0; i < Math.trunc(product['rating']); ++i) {
        starRating += yellowStar;
    }

    for (let i = 0; i < maxRating - Math.trunc(product['rating']); ++i) {
        starRating += emptyStar;
    }

    return starRating;
};