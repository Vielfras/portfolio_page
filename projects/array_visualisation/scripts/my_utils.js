'use strict';

export {
    GetElementFromHTML,
    Random,
    RandomArr,
    ShuffleArray,

    GetCurrentDate,
    GetCurrentTime,
    FetchText,
    FetchJSON,
};

// ---------======================== DOM ========================---------

function GetElementFromHTML(htmlText) {
    const template = document.createElement('template');
    template.innerHTML = htmlText.trim();

    return template.content.firstElementChild;
}

// ---------======================== MATH ========================---------

function Random(min, max) {
    return Math.random() * (max - min) + min;
}


function RandomArr(size, min, max, type = 'INT') {
    let arr = [];

    for (let i = 0; i < size; i++) {
        if (type !== 'INT') {
            arr.push(Random(min, max));
        } else {
            arr.push(Math.floor(Random(min, max + 1)));  // +1 so it's inclusive of the max integer value
        }
    }

    return arr;
}

function ShuffleArray(arr) {
    // Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// ---------======================== DATE & TIME ========================---------

function GetCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Months are zero-based in JavaScript
    const day = ("0" + currentDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}

function GetCurrentTime() {
    const currentDate = new Date();
    const hours = ("0" + currentDate.getHours()).slice(-2);
    const minutes = ("0" + currentDate.getMinutes()).slice(-2);
    const seconds = ("0" + currentDate.getSeconds()).slice(-2);

    return `${hours}:${minutes}:${seconds}`;
}


// ---------======================== ASYNC ========================---------
async function FetchText(filePath) {
    const fileContent = await fetch(filePath);
    if (!fileContent.ok) {
        throw new Error(`Error fetching ${filePath}: ${fileContent.status}`);
    }

    return fileContent.text();
}

async function FetchJSON(filePath) {
    const fileContent = await fetch(filePath);
    if (!fileContent.ok) {
        throw new Error(`Error fetching ${filePath}: ${fileContent.status}`);
    }

    return fileContent.json();
}