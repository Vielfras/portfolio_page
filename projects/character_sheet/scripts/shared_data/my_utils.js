'use strict';

export {
    FetchJSON,
    IsEmptyObject,
};

async function FetchJSON(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Error fetching ${filePath}: ${response.status}`);
    }
    return await response.json();
}

function IsEmptyObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}