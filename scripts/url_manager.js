export {
    URLManager,
};

class URLManager {
    constructor() {
        this.baseURL = this.BaseURL(window.location.href);
    }
    
    CurrentPageURL() {
        return window.location.href;
    }

    CurrantPath() {
        return window.location.pathname;
    }
    
    BaseURL(url) {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.host}`;
    }
    
    UpdateURL(path) {
        history.pushState({}, '', `${this.baseURL}/${path}`);
    }

    ParseURL() {
        return window.location.pathname;
    }

    ResetURL() {
        history.pushState({}, '', this.baseURL);
    }

    SetSearchParams(key,value) {
        const searchParams = new URLSearchParams();

        searchParams.set(key, value);
    
        this.UpdateURL(`?${searchParams.toString()}`);
    }

    GetSearchParams(){
        const searchParams = new URLSearchParams((new URL(this.CurrentPageURL()).search));
        return Object.fromEntries(searchParams);
    }
}

